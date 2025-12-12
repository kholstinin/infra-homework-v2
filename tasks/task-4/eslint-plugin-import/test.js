import { RuleTester } from "eslint";
import rule from "./order-rule.js";

const tester = new RuleTester();

tester.run("sort-imports", rule, {
  valid: [
    `import a from 'react';
import z from 'zod';
import x from './local';
import y from '../up';`,
    `import fs from 'fs';
import path from 'path';`,
  ],
  invalid: [
    {
      code: `import zod from "zod";
import c from "./c.js";
import { button } from "../components/button/index.js";
import { form } from "../components/form/index.js";
import react from "react";
import b from "./b.js";
`,
      output: `import react from "react";
import zod from "zod";
import b from "./b.js";
import c from "./c.js";
import { button } from "../components/button/index.js";
import { form } from "../components/form/index.js";
`,
      errors: [{ message: "Imports are not sorted by groups" }],
    },
    {
      code: `import z from 'zod';
import a from 'react';`,
      output: `import a from 'react';
import z from 'zod';`,
      errors: [{ message: "Imports are not sorted by groups" }],
    },
    {
      code: `import local from './b';
import ext from 'a';`,
      output: `import ext from 'a';
import local from './b';`,
      errors: [{ message: "Imports are not sorted by groups" }],
    },
    {
      code: `import up from '../zzz';
import local from './a';`,
      output: `import local from './a';
import up from '../zzz';`,
      errors: [{ message: "Imports are not sorted by groups" }],
    },
    {
      code: `import c from './c';
import b from './b';
import a from './a';`,
      output: `import a from './a';
import b from './b';
import c from './c';`,
      errors: [{ message: "Imports are not sorted by groups" }],
    },
  ],
});
