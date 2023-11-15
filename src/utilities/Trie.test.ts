import { describe, it, expect } from 'vitest';

import Trie from './Trie';

const words = [
  'abecedarian',
  'brobdingnagian',
  'cassandraic',
  'defenestration',
];

describe('Trie', () => {
  it('should store words', () => {
    const trie = new Trie();

    expect(trie.search('word')).toBe(false);

    trie.insert('word');

    expect(trie.search('word')).toBe(true);
  });

  it('should convert all words to lower case', () => {
    const trie = new Trie();

    trie.insert('WORD');

    expect(trie.search('word')).toBe(true);
    expect(trie.search('WORD')).toBe(false);
  });

  it('should return true if it contains at least one word starting with the provided prefix', () => {
    const trie = new Trie();

    trie.insert('word');

    expect(trie.startsWith('w')).toBe(true);
  });

  it('should return false if it contains no words starting with the provided prefix', () => {
    const trie = new Trie();

    trie.insert('word');

    expect(trie.startsWith('x')).toBe(false);
  });

  it('should return all contained words beginning with a provided prefix sorted alphabetically', () => {
    const trie = new Trie();

    trie.insert('car');
    trie.insert('cab');
    trie.insert('cabbage');
    trie.insert('cabbages');

    expect(trie.findSuggestions('c')).toEqual([
      'cab',
      'car',
      'cabbage',
      'cabbages',
    ]);
    expect(trie.findSuggestions('cab')).toEqual(['cab', 'cabbage', 'cabbages']);
    expect(trie.findSuggestions('cabbage')).toEqual(['cabbage', 'cabbages']);
    expect(trie.findSuggestions('foo')).toEqual([]);
  });

  it('should return all words', () => {
    const trie = new Trie();

    words.forEach((word) => trie.insert(word));
    const result: string[] = [];
    trie.findAllWords(trie.root, result);

    expect(result).toContain(words[0]);
    expect(result).toContain(words[1]);
    expect(result).toContain(words[2]);
    expect(result).toContain(words[3]);
  });
});
