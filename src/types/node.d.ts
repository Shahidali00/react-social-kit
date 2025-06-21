// Type definitions for Node.js environment
// This helps TypeScript recognize Node.js global variables

interface Process {
  versions: {
    node?: string;
    [key: string]: string | undefined;
  };
  env: {
    [key: string]: string | undefined;
  };
}

declare var process: Process;