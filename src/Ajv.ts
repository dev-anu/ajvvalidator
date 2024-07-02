import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);  // Add the formats plugin to AJV

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['username', 'email', 'password'],
  if: {
    properties: {
      requireUsername: { const: true }
    }
  },
  then: {
    required: ['username']
  }
};

const validate = ajv.compile(schema);

export const ajvValidate = (values:any) => {
  const valid = validate(values);
  if (!valid) {
    return validate?.errors?.reduce((acc:any, error:any) => {
      acc[error?.instancePath?.slice(1)] = error.message;
      return acc;
    }, {});
  }
  return {};
};
