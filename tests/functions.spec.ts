import test from 'ava';
import { getRelativePath, generateFingerprint, determineSeverity } from '../src/functions.js';

// Test getRelativePath
test('getRelativePath returns correct relative path', t => {
    const path = '/path/to/src/file.js';
    const context = {
        cwd: '/path/to',
        rulesMeta: {} 
    };
    t.is(getRelativePath(path, context), 'src/file.js');
});

// Test generateFingerprint
test('generateFingerprint generates unique fingerprint', t => {
    const data = ['path/to/file.js', null, 'Unused variable "x"', '10', '5'];
    const hashes: Set<string> = new Set();
    const fingerprint = generateFingerprint(data, hashes);
    t.is(hashes.has(fingerprint), true);
    t.is(fingerprint.length, 32);
    // Should be always the same
    t.is(fingerprint, '2076d7fe7044bba44821d3339d29bdbc');
});

test('generateFingerprint handles hash collisions by generating a new unique hash', t => {
    const data = ['path/to/file.js', 'no-unused-vars', 'Unused variable "x"', '10', '5'];
    const hashes: Set<string> = new Set();
    const initialFingerprint = generateFingerprint(data, hashes);

    hashes.add(initialFingerprint);

    const dataForCollision = ['path/to/file.js', 'no-unused-vars', 'Unused variable "x"', '10', '5'];

    const newFingerprint = generateFingerprint(dataForCollision, hashes);
    t.not(initialFingerprint, newFingerprint, 'New hash should be different from the initial to avoid collision');
    t.is(hashes.has(newFingerprint), true, 'New hash should be added to the set');
    t.is(hashes.size, 2, 'There should be two unique hashes in the set now');
});

// Test determineSeverity
test('determineSeverity returns correct severity levels', t => {
    t.is(determineSeverity(1, false), 'minor');
    t.is(determineSeverity(2, false), 'major');
    t.is(determineSeverity(0, false), 'info');
    t.is(determineSeverity(2, true), 'critical'); // проверка фатальной ошибки
});

