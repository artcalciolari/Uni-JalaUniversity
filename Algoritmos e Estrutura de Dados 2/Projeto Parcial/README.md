### README

# Book Index Program 📚

## Description ℹ️

This Java program manages a book index, allowing users to add, update, remove, and search for terms and their associated page numbers. The program supports loading and saving the index from/to a file, displaying the index in a formatted manner, and handling page ranges.

## Features ⚙️

- **Add or Update Term/Page**: Add a new term with associated pages or update an existing term with new pages.
- **Remove Term**: Remove a term and its associated pages from the index.
- **Update Term (Synonym)**: Update the name of a term, effectively renaming it.
- **Remove Page from All Terms**: Remove a specific page from all terms in the index.
- **Search Terms by Prefix**: Search for terms that start with a given prefix.
- **Display Index**: Display all terms and their associated pages in a formatted manner.
- **Load from File**: Load the index from a file.
- **Save to File**: Save the index to a file.

## Usage 🏁

1. **Load the Index**: The program attempts to load the index from a file named `indexFile.txt`.
2. **Display the Initial Index**: The program displays the initial index after loading.
3. **Menu Options**:
   - Add or Update Term/Page
   - Remove Term
   - Update Term (Synonym)
   - Remove Page from All Terms
   - Search Terms by Prefix
   - Display Index
   - Save and Exit

## File Format 🗄️

The index file should have the following format:
```
term: page1, page2, page3-rangeEnd, ...
```
Example:
```
binary search: 25
bst: 31-33, 35-40
divide and conquer: 40, 45-47
dynamic programming: 45-50
graph: 60-65
nodes: 31-33, 60-65
```

## Complexity Analysis 🔎

### `addTerm(String term, int page)`
- **Time Complexity**: O(1) for adding a term to the `HashMap`. Checking for duplicates in the list of pages is O(n), where n is the number of pages for the term.

### `removeTerm(String term)`
- **Time Complexity**: O(1) for removing a term from the `HashMap`.

### `updateTerm(String oldTerm, String newTerm)`
- **Time Complexity**: O(n) for removing the old term and adding the pages to the new term, where n is the number of pages for the old term.

### `removePageFromAllTerms(int page)`
- **Time Complexity**: O(m * n), where m is the number of terms and n is the average number of pages per term.

### `searchByPrefix(String prefix)`
- **Time Complexity**: O(m * k), where m is the number of terms and k is the average length of the terms.

### `displayIndex()`
- **Time Complexity**: O(m * n), where m is the number of terms and n is the average number of pages per term.

### `loadFromFile(String fileName)`
- **Time Complexity**: O(l * p), where l is the number of lines in the file and p is the average number of pages per line.

### `saveToFile(String fileName)`
- **Time Complexity**: O(m * n), where m is the number of terms and n is the average number of pages per term.

### `convertPagesToString(List<Integer> pagesList)`
- **Time Complexity**: O(n log n) for sorting the list of pages and O(n) for converting the list to a string, where n is the number of pages.

### `parseAndAddLine(String line)`
- **Time Complexity**: O(p), where p is the number of pages in the line.

### Program Time Complexity 👨‍💻

- The program is dominated by O(m * n), where m is the number of terms and n is the average number of pages per term.