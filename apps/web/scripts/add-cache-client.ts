import fs from "fs";
import path from "path";

const filePath = path.join("src/client/sdk.gen.ts");

const wrapFunctionsInCache = (filePath: string) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    if (!data.includes('import { cache } from "react";')) {
      data = `import { cache } from "react";\n\n` + data;
    }

    const modifiedData = data
      .replaceAll("<ThrowOnError extends", "cache(\n<ThrowOnError extends")
      .replaceAll(
        `  });
};`,
        `    });
  },
);`,
      );
    fs.writeFile(filePath, modifiedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("Added cache successfully!");
      }
    });
  });
};

wrapFunctionsInCache(filePath);
