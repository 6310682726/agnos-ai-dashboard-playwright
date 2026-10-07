import { test } from './fixtures';

test.describe('Registration form', () => {
  test('SIGNUP-001 - shows required fields and disables confirmation initially', async ({ signupPage }) => {
    await signupPage.goto();
    await signupPage.expectRequiredRegistrationFields();
  });

  test('SIGNUP-002 - keeps confirmation disabled for a malformed email', async ({ signupPage }) => {
    await signupPage.goto();
    await signupPage.enterInvalidRegistrationDetails();
    await signupPage.expectConfirmationDisabled();
  });
});
