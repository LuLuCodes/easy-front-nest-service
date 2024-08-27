import { CalculatedConfig, FieldValues, Calculated } from '@libs/calculated';

describe('test calculated', () => {
  it('simple expression', async () => {
    const calculated = new Calculated();
    const config: CalculatedConfig = {
      calculation_type: 'simple',
      calculation_expression: '{a} + {b}',
      dependent_fields: ['a', 'b'],
    };
    const fieldValues: FieldValues = {
      a: 1,
      b: 2,
    };
    const result = calculated.calculateFieldValue(config, fieldValues);
    console.log('simple result:', result);
  });

  it('complex expression', async () => {
    const calculated = new Calculated();
    const config: CalculatedConfig = {
      calculation_type: 'complex',
      calculation_expression: `
        const { birthday } = args;
        const birthDate = new Date(birthday);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age;
      `,
      dependent_fields: ['birthday'],
    };
    const fieldValues: FieldValues = {
      birthday: '1983-09-26',
    };
    const result = await calculated.calculateFieldValue(config, fieldValues);
    console.log('complex result:', result);
  });
});
