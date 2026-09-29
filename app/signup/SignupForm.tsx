"use client";

import { useActionState } from "react";
import { submitSignupForm } from "./actions";
import { AuthLayout } from "@/ui/components/AuthLayout";
import { FormInput } from "@/ui/components/FormField";
import { FormMessage } from "@/ui/components/FormMessage";
import { LinkPrompt } from "@/ui/components/LinkPrompt";
import { SubmitButton } from "@/ui/components/SubmitButton";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(submitSignupForm, null);

  return (
    <AuthLayout title="Sign up to use Questline">
      <form action={formAction} className="flex flex-col gap-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Email Address"
          defaultValue={state?.values?.email}
          errors={state?.errors?.email}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Your Password"
          errors={state?.errors?.password}
        />
        <FormInput
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Your Password"
          errors={state?.errors?.confirmPassword}
        />
        <div className="mt-8 flex flex-col gap-4">
          {state?.errors?.catchAll && <FormMessage variant="error">{state.errors.catchAll[0]}</FormMessage>}
          <SubmitButton pending={pending}>Sign up</SubmitButton>
        </div>
        <LinkPrompt prompt="Already have an account?" href="/login" linkText="Sign in here" />
      </form>
    </AuthLayout>
  );
}
