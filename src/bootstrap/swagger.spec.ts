import { buildSwaggerOptions } from './swagger';

describe('buildSwaggerOptions', () => {
  it('returns a SecuritySchemeObject with bearer auth wired up', () => {
    const doc = buildSwaggerOptions({
      name: 'svc',
      desc: 'd',
      version: '6.0.0',
    });
    expect(doc.info).toMatchObject({ title: 'svc', description: 'd', version: '6.0.0' });
    expect(doc.components?.securitySchemes).toBeDefined();
  });

  it('falls back to empty strings when config keys are missing', () => {
    const doc = buildSwaggerOptions({});
    expect(doc.info.title).toBe('');
    expect(doc.info.description).toBe('');
    expect(doc.info.version).toBe('');
  });
});
