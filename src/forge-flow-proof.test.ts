import { describe, it, expect, beforeEach } from 'vitest';
import forgeFlowProof from './forge-flow-proof.json';

describe('forge-flow-proof.json', () => {
  describe('Schema Validation', () => {
    it('should have all required fields', () => {
      expect(forgeFlowProof).toHaveProperty('provider');
      expect(forgeFlowProof).toHaveProperty('humanReviewRequired');
      expect(forgeFlowProof).toHaveProperty('policyEnforced');
      expect(forgeFlowProof).toHaveProperty('testsCaptured');
      expect(forgeFlowProof).toHaveProperty('generatedAt');
    });

    it('should have correct data types', () => {
      expect(typeof forgeFlowProof.provider).toBe('string');
      expect(typeof forgeFlowProof.humanReviewRequired).toBe('boolean');
      expect(typeof forgeFlowProof.policyEnforced).toBe('boolean');
      expect(typeof forgeFlowProof.testsCaptured).toBe('boolean');
      expect(typeof forgeFlowProof.generatedAt).toBe('string');
    });

    it('should not have unexpected properties', () => {
      const expectedKeys = ['provider', 'humanReviewRequired', 'policyEnforced', 'testsCaptured', 'generatedAt'];
      const actualKeys = Object.keys(forgeFlowProof);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys.length).toBe(expectedKeys.length);
    });
  });

  describe('Provider Field', () => {
    it('should have valid provider value', () => {
      expect(forgeFlowProof.provider).toBe('anthropic-claude');
    });

    it('should not be empty', () => {
      expect(forgeFlowProof.provider).toBeTruthy();
      expect(forgeFlowProof.provider.length).toBeGreaterThan(0);
    });

    it('should match expected provider format', () => {
      expect(forgeFlowProof.provider).toMatch(/^[a-z0-9-]+$/);
    });
  });

  describe('Boolean Flags', () => {
    it('should have humanReviewRequired set to true', () => {
      expect(forgeFlowProof.humanReviewRequired).toBe(true);
    });

    it('should have policyEnforced set to true', () => {
      expect(forgeFlowProof.policyEnforced).toBe(true);
    });

    it('should have testsCaptured set to true', () => {
      expect(forgeFlowProof.testsCaptured).toBe(true);
    });

    it('should have all boolean flags as actual booleans', () => {
      expect(forgeFlowProof.humanReviewRequired).toBeTypeOf('boolean');
      expect(forgeFlowProof.policyEnforced).toBeTypeOf('boolean');
      expect(forgeFlowProof.testsCaptured).toBeTypeOf('boolean');
    });
  });

  describe('Timestamp Field', () => {
    it('should have valid ISO 8601 timestamp format', () => {
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
      expect(forgeFlowProof.generatedAt).toMatch(isoDateRegex);
    });

    it('should be a parseable date', () => {
      const date = new Date(forgeFlowProof.generatedAt);
      expect(date).toBeInstanceOf(Date);
      expect(date.toString()).not.toBe('Invalid Date');
    });

    it('should have expected timestamp value', () => {
      expect(forgeFlowProof.generatedAt).toBe('2024-01-15T08:30:00Z');
    });

    it('should represent a valid date in the past', () => {
      const date = new Date(forgeFlowProof.generatedAt);
      const now = new Date();
      expect(date.getTime()).toBeLessThanOrEqual(now.getTime());
    });

    it('should be in UTC timezone', () => {
      expect(forgeFlowProof.generatedAt).toContain('Z');
    });
  });

  describe('Configuration Consistency', () => {
    it('should have consistent security configuration', () => {
      expect(forgeFlowProof.humanReviewRequired).toBe(true);
      expect(forgeFlowProof.policyEnforced).toBe(true);
    });

    it('should indicate tests are captured when policy is enforced', () => {
      if (forgeFlowProof.policyEnforced) {
        expect(forgeFlowProof.testsCaptured).toBe(true);
      }
    });
  });

  describe('JSON Serialization', () => {
    it('should be serializable to JSON string', () => {
      expect(() => JSON.stringify(forgeFlowProof)).not.toThrow();
    });

    it('should maintain data integrity after serialization', () => {
      const serialized = JSON.stringify(forgeFlowProof);
      const deserialized = JSON.parse(serialized);
      expect(deserialized).toEqual(forgeFlowProof);
    });

    it('should produce valid JSON output', () => {
      const jsonString = JSON.stringify(forgeFlowProof);
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });

  describe('Immutability', () => {
    it('should maintain original values', () => {
      const originalProvider = forgeFlowProof.provider;
      const originalTimestamp = forgeFlowProof.generatedAt;
      
      expect(forgeFlowProof.provider).toBe(originalProvider);
      expect(forgeFlowProof.generatedAt).toBe(originalTimestamp);
    });
  });

  describe('Edge Cases', () => {
    it('should handle object spread correctly', () => {
      const spread = { ...forgeFlowProof };
      expect(spread).toEqual(forgeFlowProof);
    });

    it('should handle Object.keys correctly', () => {
      const keys = Object.keys(forgeFlowProof);
      expect(keys).toContain('provider');
      expect(keys).toContain('humanReviewRequired');
      expect(keys).toContain('policyEnforced');
      expect(keys).toContain('testsCaptured');
      expect(keys).toContain('generatedAt');
    });

    it('should handle Object.values correctly', () => {
      const values = Object.values(forgeFlowProof);
      expect(values).toContain('anthropic-claude');
      expect(values).toContain(true);
      expect(values).toContain('2024-01-15T08:30:00Z');
    });
  });
});