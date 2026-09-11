import { test } from './fixtures';

test('SIGNUP-001 - displays required registration fields and disabled submit state', async ({ signupPage }) => {
  await signupPage.goto();
  await signupPage.expectRequiredRegistrationFields();
});
