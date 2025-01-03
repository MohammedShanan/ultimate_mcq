<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $felids = $request->validate([
            "name" => ['required', 'max:255', 'unique:users'],
            "password" => ['required', 'confirmed'],
        ]);
        $user = User::create($felids);
        $token = $user->createToken($request->name);
        return ['token' => $token->plainTextToken, 'user' => $user];
    }

    public function login(Request $request)
    {
        $request->validate([
            "name" => ['required'],
            "password" => ['required'],
        ]);
        $user = User::where('name', $request->name)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return ['errors' => ['name' => ['Wrong user name or password']]];
        }
        $token = $user->createToken($user->name);
        return ['token' => $token->plainTextToken, 'user' => $user];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return ['message' => 'you have been logged out'];
    }
}
