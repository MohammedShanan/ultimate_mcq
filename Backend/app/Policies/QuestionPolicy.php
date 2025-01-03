<?php

namespace App\Policies;

use App\Models\Question;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QuestionPolicy
{
    public function modify(User $user, Question $question): Response
    {
        return $user->id === $question->user_id
            ? Response::allow()
            : Response::deny("You can't update this quiz");
    }
}
