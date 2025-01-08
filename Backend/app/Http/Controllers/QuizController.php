<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class QuizController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [new Middleware('auth:sanctum', except: ['index', 'show'])];
    }
    // List all quizzes
    public function index()
    {
        $quizzes = Quiz::with('user')->get();
        return response()->json($quizzes);
    }

    // Show a single quiz
    public function show($id)
    {
        $quiz = Quiz::with('questions.answers')->findOrFail($id);
        return response()->json($quiz);
    }

    // Create a new quiz
    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'questions' => 'required|array',
            'questions.*.question_text' => 'required|string',
            'questions.*.answers' => 'required|array|min:4|max:4',
            'questions.*.answers.*.answer_text' => 'required|string',
            'questions.*.answers.*.is_correct' => 'required|boolean',
        ]);
        // Check if user is authenticated
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Create the quiz
        $quiz = $request->user()->quizzes()->create([
            'title' => $validated['title']
        ]);

        // Create questions and their answers
        foreach ($validated['questions'] as $questionData) {
            $question = $quiz->questions()->create([
                'question_text' => $questionData['question_text']
            ]);

            foreach ($questionData['answers'] as $answerData) {
                $question->answers()->create($answerData);
            }
        }
        return response()->json(['message' => 'Quiz created successfully.', 'quiz' => $quiz], 201);
    }
    // Update an existing quiz
    public function update(Request $request, Quiz $quiz)
    {
        Gate::authorize('modify', $quiz);
        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'questions' => 'required|array',
            'questions.*.id' => 'nullable|exists:questions,id',
            'questions.*.question_text' => 'required|string',
            'questions.*.answers' => 'required|array|min:4|max:4',
            'questions.*.answers.*.id' => 'nullable|exists:answers,id',
            'questions.*.answers.*.answer_text' => 'required|string',
            'questions.*.answers.*.is_correct' => 'required|boolean',
        ]);

        // Update the quiz title
        $quiz->update(['title' => $validated['title']]);

        // Track question IDs sent in the request
        $questionIds = collect($validated['questions'])->pluck('id')->filter()->toArray();

        // Delete questions not in the request
        $quiz->questions()->whereNotIn('id', $questionIds)->delete();

        // Process questions
        foreach ($validated['questions'] as $questionData) {
            if (isset($questionData['id'])) {
                // Update existing question
                $question = $quiz->questions()->findOrFail($questionData['id']);
                $question->update(['question_text' => $questionData['question_text']]);
            } else {
                // Create new question
                $question = $quiz->questions()->create(['question_text' => $questionData['question_text']]);
            }

            // Track answer IDs sent in the request
            $answerIds = collect($questionData['answers'])->pluck('id')->filter()->toArray();

            // Delete answers not in the request
            $question->answers()->whereNotIn('id', $answerIds)->delete();

            // Process answers
            foreach ($questionData['answers'] as $answerData) {
                if (isset($answerData['id'])) {
                    // Update existing answer
                    $answer = $question->answers()->findOrFail($answerData['id']);
                    $answer->update([
                        'answer_text' => $answerData['answer_text'],
                        'is_correct' => $answerData['is_correct'],
                    ]);
                } else {
                    // Create new answer
                    $question->answers()->create([
                        'answer_text' => $answerData['answer_text'],
                        'is_correct' => $answerData['is_correct'],
                    ]);
                }
            }
        }
        return response()->json(['message' => 'Quiz updated successfully.', 'quiz' => $quiz]);
    }

    // Delete a quiz
    public function destroy(Quiz $quiz)
    {
        Gate::authorize('modify', $quiz);
        $quiz->delete();
        return response()->json(['message' => 'Quiz deleted successfully.']);
    }
}
