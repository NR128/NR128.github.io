# Markdown Formatting Guide

This blog uses `marked.js` to parse markdown on the fly. Here's a quick showcase of how elements look!

## Typography

You can use **bold text**, *italic text*, or ~~strikethrough text~~.

## Code Blocks

```python
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        next_val = sequence[-1] + sequence[-2]
        sequence.append(next_val)
        
    return sequence

print(fibonacci(10))
```

## Lists

- Item 1
- Item 2
  - Subitem A
  - Subitem B
- Item 3

1. First
2. Second
3. Third

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay
