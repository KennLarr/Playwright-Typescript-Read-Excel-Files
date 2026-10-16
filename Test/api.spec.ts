

import { test, expect } from '@playwright/test';

test('API get test @api', async ({ request }) => {
  const response = await request.get(
    'https://fake-json-api.mock.beeceptor.com/users'
  );

  expect(response.status()).toBe(200);

const data = await response.json();

  console.log(data);
  const user = data[0];
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('phone');
});

