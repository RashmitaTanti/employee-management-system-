<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'string',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * Authentication rules:
     *
     * 1. rashmita@gmail.com is the only Admin.
     * 2. Admin does not need an Employee record.
     * 3. Every other user must have a linked Employee record.
     * 4. Non-existing users cannot log in.
     * 5. Users without an Employee record cannot log in.
     * 6. Existing Employee/Admin with wrong password gets
     *    "The password is incorrect."
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        /*
        |--------------------------------------------------------------------------
        | Normalize Email
        |--------------------------------------------------------------------------
        */

        $email = Str::lower(
            trim(
                $this->string('email')->toString()
            )
        );

        $password = $this->string(
            'password'
        )->toString();

        /*
        |--------------------------------------------------------------------------
        | Only rashmita@gmail.com is Admin
        |--------------------------------------------------------------------------
        */

        $isAdmin = $email === 'rashmita@gmail.com';

        /*
        |--------------------------------------------------------------------------
        | Find User Account
        |--------------------------------------------------------------------------
        */

        $user = User::where(
            'email',
            $email
        )->first();

        /*
        |--------------------------------------------------------------------------
        | User Does Not Exist
        |--------------------------------------------------------------------------
        |
        | Do not reveal whether the email exists in the system.
        |
        */

        if (! $user) {
            RateLimiter::hit(
                $this->throttleKey()
            );

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Non-Admin User Must Be an Employee
        |--------------------------------------------------------------------------
        |
        | Admin is identified only by:
        |
        | rashmita@gmail.com
        |
        | Every other account must have a linked Employee record.
        |
        */

        if (
            ! $isAdmin &&
            ! $user->employee
        ) {
            RateLimiter::hit(
                $this->throttleKey()
            );

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Check Email + Password
        |--------------------------------------------------------------------------
        */

        $authenticated = Auth::attempt(
            [
                'email' => $email,
                'password' => $password,
            ],
            $this->boolean('remember')
        );

        /*
        |--------------------------------------------------------------------------
        | Password Is Incorrect
        |--------------------------------------------------------------------------
        |
        | At this point:
        |
        | - User exists
        | - Admin OR valid Employee account
        |
        | Therefore a failed authentication means the password is wrong.
        |
        */

        if (! $authenticated) {
            RateLimiter::hit(
                $this->throttleKey()
            );

            throw ValidationException::withMessages([
                'password' => 'The password is incorrect.',
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Login Successful
        |--------------------------------------------------------------------------
        */

        RateLimiter::clear(
            $this->throttleKey()
        );
    }

    /**
     * Ensure the login request is not rate limited.
     */
    protected function ensureIsNotRateLimited(): void
    {
        if (
            ! RateLimiter::tooManyAttempts(
                $this->throttleKey(),
                5
            )
        ) {
            return;
        }

        event(
            new Lockout($this)
        );

        $seconds = RateLimiter::availableIn(
            $this->throttleKey()
        );

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil(
                    $seconds / 60
                ),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    protected function throttleKey(): string
    {
        return Str::transliterate(
            Str::lower(
                $this->string('email')->toString()
            ) . '|' . $this->ip()
        );
    }
}