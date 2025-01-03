<?php

namespace App\Policies;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class QuizPolicy
{
    /**
     * Determine whether the user can permanently delete the model.
     */
    public function modify(User $user, Quiz $quiz): Response
    {
        return $user->id === $quiz->user_id
            ? Response::allow()
            : Response::deny("You can't update this quiz");
    }
}
