"use strict";

/* =========================================================
   دروس التأسيس من الصفر
   تُضاف تلقائياً لكل لغة: مقدمات نظرية + دروس إضافية
   ويتم دمجها مع الدروس الموجودة في script.js
========================================================= */

/* ---------- 1. معلومات التشغيل لكل لغة ---------- */
const SETUP = {
  html:{how:"المتصفح يقرأ ملف HTML ويرسم الصفحة على الشاشة، فلا تحتاج إلى مترجم.",install:"محرر نصوص مثل VS Code ومتصفح (Chrome أو Firefox)",file:"index.html",cmd:"افتح الملف بالنقر المزدوج عليه ليظهر في المتصفح"},
  css:{how:"المتصفح يقرأ قواعد CSS ويطبقها على عناصر HTML أثناء رسم الصفحة.",install:"محرر نصوص ومتصفح",file:"style.css",cmd:"اربطه بصفحتك: <link rel=\"stylesheet\" href=\"style.css\">"},
  javascript:{how:"JavaScript لغة مُفسَّرة: المتصفح أو Node.js يقرأ الكود وينفذه سطراً بسطر.",install:"متصفح حديث (تكفيك أداة Console بالضغط على F12) أو Node.js",file:"app.js",cmd:"node app.js"},
  typescript:{how:"TypeScript تُترجم أولاً إلى JavaScript، ثم يُشغَّل الناتج بواسطة Node.js.",install:"Node.js ثم الأمر: npm install -g typescript",file:"app.ts",cmd:"tsc app.ts\nnode app.js"},
  react:{how:"React مكتبة JavaScript؛ أداة بناء مثل Vite تحوّل مكوناتك إلى صفحة يفهمها المتصفح.",install:"Node.js ومحرر VS Code",file:"src/App.jsx",cmd:"npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev"},
  vuejs:{how:"Vue إطار عمل JavaScript؛ أداة البناء تحوّل ملفات .vue إلى كود يفهمه المتصفح.",install:"Node.js ومحرر VS Code",file:"src/App.vue",cmd:"npm create vue@latest\ncd my-app\nnpm install\nnpm run dev"},
  angular:{how:"Angular إطار عمل يعتمد على TypeScript، وأداة Angular CLI تبني المشروع وتشغله.",install:"Node.js ثم الأمر: npm install -g @angular/cli",file:"src/app/app.component.ts",cmd:"ng new my-app\ncd my-app\nng serve"},
  nodejs:{how:"Node.js يشغّل JavaScript خارج المتصفح، فيصبح بإمكانك بناء خوادم وأدوات.",install:"Node.js من الموقع الرسمي nodejs.org",file:"app.js",cmd:"node app.js"},
  python:{how:"Python لغة مُفسَّرة: المفسر يقرأ الملف وينفذه سطراً بسطر دون خطوة ترجمة منفصلة.",install:"Python من الموقع الرسمي python.org",file:"main.py",cmd:"python main.py"},
  java:{how:"Java تُترجم إلى شيفرة وسيطة (Bytecode) تعمل على آلة Java الافتراضية JVM، لذلك يعمل البرنامج نفسه على أنظمة مختلفة.",install:"حزمة JDK",file:"Main.java",cmd:"javac Main.java\njava Main"},
  cpp:{how:"C++ لغة مُترجَمة: المترجم يحول كودك كله إلى ملف تنفيذي بلغة الآلة قبل التشغيل، لذلك تكون سريعة جداً.",install:"مترجم g++ (ضمن MinGW على ويندوز أو Xcode Tools على ماك)",file:"main.cpp",cmd:"g++ main.cpp -o main\n./main"},
  c:{how:"C لغة مُترجَمة: المترجم يحول كودك مباشرة إلى لغة الآلة، وهذا يعطيك تحكماً وسرعة عاليين.",install:"مترجم gcc (ضمن MinGW على ويندوز أو Xcode Tools على ماك)",file:"main.c",cmd:"gcc main.c -o main\n./main"},
  csharp:{how:"C# تُترجم إلى شيفرة وسيطة تنفذها بيئة .NET.",install:".NET SDK من موقع مايكروسوفت",file:"Program.cs",cmd:"dotnet new console -o MyApp\ncd MyApp\ndotnet run"},
  php:{how:"PHP تعمل على الخادم: يقرأ مفسر PHP الملف وينفذه ثم يرسل الناتج إلى الزائر.",install:"PHP من php.net أو حزمة مثل XAMPP",file:"index.php",cmd:"php index.php"},
  go:{how:"Go لغة مُترجَمة وسريعة الترجمة، تنتج ملفاً تنفيذياً واحداً سهل التوزيع.",install:"Go من go.dev",file:"main.go",cmd:"go run main.go"},
  rust:{how:"Rust لغة مُترجَمة تفحص مترجمتها كودك بصرامة لتمنع أخطاء الذاكرة قبل التشغيل.",install:"Rust عبر الأداة الرسمية rustup",file:"main.rs",cmd:"rustc main.rs\n./main"},
  ruby:{how:"Ruby لغة مُفسَّرة: المفسر ينفذ كودك سطراً بسطر.",install:"Ruby من ruby-lang.org",file:"main.rb",cmd:"ruby main.rb"},
  kotlin:{how:"Kotlin تُترجم إلى شيفرة وسيطة تعمل على JVM، وهي اللغة الأساسية لتطبيقات Android الحديثة.",install:"IntelliJ IDEA (الأسهل للمبتدئين) أو مترجم kotlinc",file:"Main.kt",cmd:"kotlinc Main.kt -include-runtime -d main.jar\njava -jar main.jar"},
  swift:{how:"Swift لغة مُترجَمة من آبل لبناء تطبيقات iOS وmacOS.",install:"Xcode على ماك، أو Swift Toolchain من swift.org",file:"main.swift",cmd:"swift main.swift"},
  dart:{how:"Dart تُترجم إلى لغة الآلة أو إلى JavaScript، وهي لغة Flutter.",install:"Dart SDK من dart.dev",file:"main.dart",cmd:"dart run main.dart"},
  sql:{how:"SQL ليست لغة برامج كاملة بل لغة أوامر موجّهة إلى قاعدة بيانات، والقاعدة هي التي تنفذها.",install:"SQLite (الأخف للتجربة) أو MySQL أو PostgreSQL",file:"school.db",cmd:"sqlite3 school.db\nsqlite> SELECT 'Hello';"},
  bash:{how:"Bash مفسر أوامر: يقرأ الأوامر من الطرفية أو من ملف نصي وينفذها واحداً تلو الآخر.",install:"موجود في لينكس وماك، وعلى ويندوز عبر WSL أو Git Bash",file:"script.sh",cmd:"bash script.sh"},
  powershell:{how:"PowerShell مفسر أوامر من مايكروسوفت يتعامل مع الأوامر والكائنات.",install:"موجود في ويندوز، وتستطيع تثبيته على ماك ولينكس",file:"script.ps1",cmd:"pwsh script.ps1"},
  lua:{how:"Lua لغة مُفسَّرة خفيفة، تُدمج كثيراً داخل الألعاب والبرامج.",install:"Lua من lua.org",file:"main.lua",cmd:"lua main.lua"},
  perl:{how:"Perl لغة مُفسَّرة ممتازة في معالجة النصوص.",install:"Perl (موجود غالباً في لينكس وماك)",file:"main.pl",cmd:"perl main.pl"},
  r:{how:"R لغة مُفسَّرة مخصصة للإحصاء والرسوم البيانية.",install:"R من r-project.org، ويُفضَّل معه RStudio",file:"script.R",cmd:"Rscript script.R"},
  julia:{how:"Julia تُترجم لحظياً أثناء التشغيل، فتجمع بين سهولة اللغات المفسَّرة وسرعة المترجَمة.",install:"Julia من julialang.org",file:"main.jl",cmd:"julia main.jl"},
  scala:{how:"Scala تُترجم إلى شيفرة وسيطة تعمل على JVM، وتجمع بين البرمجة الكائنية والوظيفية.",install:"أداة scala-cli",file:"Main.scala",cmd:"scala-cli run Main.scala"},
  haskell:{how:"Haskell لغة وظيفية مُترجَمة، وتستطيع تشغيل ملفاتها مباشرة بمفسّر runghc.",install:"GHC عبر الأداة الرسمية GHCup",file:"Main.hs",cmd:"runghc Main.hs"},
  elixir:{how:"Elixir تعمل على آلة Erlang الافتراضية المعروفة بالثبات والتزامن.",install:"Elixir من elixir-lang.org",file:"main.exs",cmd:"elixir main.exs"}
};

/* ---------- 2. أغلفة البرامج (الدالة الرئيسية وما شابه) ---------- */
const WRAP = {
  java:{pre:"public class Main {\n  public static void main(String[] args) {",post:"  }\n}",ind:4},
  c:{pre:"#include <stdio.h>\n#include <string.h>\n\nint main() {",post:"  return 0;\n}",ind:2},
  cpp:{pre:"#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {",post:"  return 0;\n}",ind:2},
  php:{pre:"<?php",ind:0},
  go:{pre:"package main\n\nimport \"fmt\"\n\nfunc main() {",post:"}",ind:2},
  rust:{pre:"fn main() {",post:"}",ind:2},
  kotlin:{pre:"fun main() {",post:"}",ind:2},
  dart:{pre:"void main() {",post:"}",ind:2},
  scala:{pre:"@main def run(): Unit =",ind:2},
  haskell:{pre:"main :: IO ()\nmain = do",ind:2}
};

function wrapCode(id, lines) {
  const w = WRAP[id];
  const body = lines.join("\n");
  if (!w) return body;
  const pad = " ".repeat(w.ind);
  const indented = body.split("\n").map(line => line ? pad + line : line).join("\n");
  return w.pre + "\n" + indented + (w.post ? "\n" + w.post : "");
}

/* ---------- 3. أكواد الدروس الإضافية لكل لغة ---------- */
/* cmt: رمز التعليق، hello: أمر الطباعة، arith: عمليات حسابية، str: نصوص، logic: عوامل منطقية */
const PROFILE = {
  javascript:{cmt:"//",hello:'console.log("Hello");',
    arith:["let a = 7;","let b = 2;","console.log(a + b);","console.log(a * b);","console.log(a % b);"],
    str:['const name = "Sara";','console.log("Hello, " + name + "!");',"console.log(name.length);"],
    logic:["const age = 20;","const hasId = true;","if (age >= 18 && hasId) {",'  console.log("Allowed");',"} else {",'  console.log("Denied");',"}"]},
  typescript:{cmt:"//",hello:'console.log("Hello");',
    arith:["let a: number = 7;","let b: number = 2;","console.log(a + b);","console.log(a * b);","console.log(a % b);"],
    str:['const name: string = "Sara";','console.log("Hello, " + name + "!");',"console.log(name.length);"],
    logic:["const age: number = 20;","const hasId: boolean = true;","if (age >= 18 && hasId) {",'  console.log("Allowed");',"} else {",'  console.log("Denied");',"}"]},
  python:{cmt:"#",hello:'print("Hello")',
    arith:["a = 7","b = 2","print(a + b)","print(a * b)","print(a % b)"],
    str:['name = "Sara"','print("Hello, " + name + "!")',"print(len(name))"],
    logic:["age = 20","has_id = True","if age >= 18 and has_id:",'    print("Allowed")',"else:",'    print("Denied")']},
  java:{cmt:"//",hello:'System.out.println("Hello");',
    arith:["int a = 7;","int b = 2;","System.out.println(a + b);","System.out.println(a * b);","System.out.println(a % b);"],
    str:['String name = "Sara";','System.out.println("Hello, " + name + "!");',"System.out.println(name.length());"],
    logic:["int age = 20;","boolean hasId = true;","if (age >= 18 && hasId) {",'  System.out.println("Allowed");',"} else {",'  System.out.println("Denied");',"}"]},
  cpp:{cmt:"//",hello:'cout << "Hello" << endl;',
    arith:["int a = 7;","int b = 2;","cout << a + b << endl;","cout << a * b << endl;","cout << a % b << endl;"],
    str:['string name = "Sara";','cout << "Hello, " << name << "!" << endl;',"cout << name.length() << endl;"],
    logic:["int age = 20;","bool hasId = true;","if (age >= 18 && hasId) {",'  cout << "Allowed" << endl;',"} else {",'  cout << "Denied" << endl;',"}"]},
  c:{cmt:"//",hello:'printf("Hello\\n");',
    arith:["int a = 7;","int b = 2;",'printf("%d\\n", a + b);','printf("%d\\n", a * b);','printf("%d\\n", a % b);'],
    str:['char name[] = "Sara";','printf("Hello, %s!\\n", name);','printf("%d\\n", (int)strlen(name));'],
    logic:["int age = 20;","int hasId = 1;","if (age >= 18 && hasId) {",'  printf("Allowed\\n");',"} else {",'  printf("Denied\\n");',"}"]},
  csharp:{cmt:"//",hello:'Console.WriteLine("Hello");',
    arith:["int a = 7;","int b = 2;","Console.WriteLine(a + b);","Console.WriteLine(a * b);","Console.WriteLine(a % b);"],
    str:['string name = "Sara";','Console.WriteLine("Hello, " + name + "!");',"Console.WriteLine(name.Length);"],
    logic:["int age = 20;","bool hasId = true;","if (age >= 18 && hasId)","{",'    Console.WriteLine("Allowed");',"}","else","{",'    Console.WriteLine("Denied");',"}"]},
  php:{cmt:"//",hello:'echo "Hello\\n";',
    arith:["$a = 7;","$b = 2;",'echo ($a + $b) . "\\n";','echo ($a * $b) . "\\n";','echo ($a % $b) . "\\n";'],
    str:['$name = "Sara";','echo "Hello, " . $name . "!\\n";','echo strlen($name) . "\\n";'],
    logic:["$age = 20;","$hasId = true;","if ($age >= 18 && $hasId) {",'  echo "Allowed\\n";',"} else {",'  echo "Denied\\n";',"}"]},
  go:{cmt:"//",hello:'fmt.Println("Hello")',
    arith:["a := 7","b := 2","fmt.Println(a + b)","fmt.Println(a * b)","fmt.Println(a % b)"],
    str:['name := "Sara"','fmt.Println("Hello, " + name + "!")',"fmt.Println(len(name))"],
    logic:["age := 20","hasId := true","if age >= 18 && hasId {",'  fmt.Println("Allowed")',"} else {",'  fmt.Println("Denied")',"}"]},
  rust:{cmt:"//",hello:'println!("Hello");',
    arith:["let a = 7;","let b = 2;",'println!("{}", a + b);','println!("{}", a * b);','println!("{}", a % b);'],
    str:['let name = "Sara";','println!("Hello, {}!", name);','println!("{}", name.len());'],
    logic:["let age = 20;","let has_id = true;","if age >= 18 && has_id {",'  println!("Allowed");',"} else {",'  println!("Denied");',"}"]},
  ruby:{cmt:"#",hello:'puts "Hello"',
    arith:["a = 7","b = 2","puts a + b","puts a * b","puts a % b"],
    str:['name = "Sara"','puts "Hello, " + name + "!"',"puts name.length"],
    logic:["age = 20","has_id = true","if age >= 18 && has_id",'  puts "Allowed"',"else",'  puts "Denied"',"end"]},
  kotlin:{cmt:"//",hello:'println("Hello")',
    arith:["val a = 7","val b = 2","println(a + b)","println(a * b)","println(a % b)"],
    str:['val name = "Sara"','println("Hello, " + name + "!")',"println(name.length)"],
    logic:["val age = 20","val hasId = true","if (age >= 18 && hasId) {",'  println("Allowed")',"} else {",'  println("Denied")',"}"]},
  swift:{cmt:"//",hello:'print("Hello")',
    arith:["let a = 7","let b = 2","print(a + b)","print(a * b)","print(a % b)"],
    str:['let name = "Sara"','print("Hello, " + name + "!")',"print(name.count)"],
    logic:["let age = 20","let hasId = true","if age >= 18 && hasId {",'  print("Allowed")',"} else {",'  print("Denied")',"}"]},
  dart:{cmt:"//",hello:'print("Hello");',
    arith:["int a = 7;","int b = 2;","print(a + b);","print(a * b);","print(a % b);"],
    str:['String name = "Sara";','print("Hello, " + name + "!");',"print(name.length);"],
    logic:["int age = 20;","bool hasId = true;","if (age >= 18 && hasId) {",'  print("Allowed");',"} else {",'  print("Denied");',"}"]},
  bash:{cmt:"#",hello:'echo "Hello"',
    arith:["a=7","b=2","echo $((a + b))","echo $((a * b))","echo $((a % b))"],
    str:['name="Sara"','echo "Hello, $name!"',"echo ${#name}"],
    logic:["age=20","has_id=1",'if [ "$age" -ge 18 ] && [ "$has_id" -eq 1 ]; then','  echo "Allowed"',"else",'  echo "Denied"',"fi"]},
  powershell:{cmt:"#",hello:'Write-Output "Hello"',
    arith:["$a = 7","$b = 2","Write-Output ($a + $b)","Write-Output ($a * $b)","Write-Output ($a % $b)"],
    str:['$name = "Sara"','Write-Output "Hello, $name!"',"Write-Output $name.Length"],
    logic:["$age = 20","$hasId = $true","if ($age -ge 18 -and $hasId) {",'  Write-Output "Allowed"',"} else {",'  Write-Output "Denied"',"}"]},
  lua:{cmt:"--",hello:'print("Hello")',
    arith:["local a = 7","local b = 2","print(a + b)","print(a * b)","print(a % b)"],
    str:['local name = "Sara"','print("Hello, " .. name .. "!")',"print(#name)"],
    logic:["local age = 20","local hasId = true","if age >= 18 and hasId then",'  print("Allowed")',"else",'  print("Denied")',"end"]},
  perl:{cmt:"#",hello:'print "Hello\\n";',
    arith:["my $x = 7;","my $y = 2;",'print $x + $y, "\\n";','print $x * $y, "\\n";','print $x % $y, "\\n";'],
    str:['my $name = "Sara";','print "Hello, " . $name . "!\\n";','print length($name), "\\n";'],
    logic:["my $age = 20;","my $has_id = 1;","if ($age >= 18 && $has_id) {",'  print "Allowed\\n";',"} else {",'  print "Denied\\n";',"}"]},
  r:{cmt:"#",hello:'print("Hello")',
    arith:["a <- 7","b <- 2","print(a + b)","print(a * b)","print(a %% b)"],
    str:['name <- "Sara"','print(paste0("Hello, ", name, "!"))',"print(nchar(name))"],
    logic:["age <- 20","has_id <- TRUE","if (age >= 18 && has_id) {",'  print("Allowed")',"} else {",'  print("Denied")',"}"],
    fmt:{arith:["[1] 9","[1] 14","[1] 1"],str:['[1] "Hello, Sara!"',"[1] 4"],logic:['[1] "Allowed"'],hello:'[1] "Hello"'}},
  julia:{cmt:"#",hello:'println("Hello")',
    arith:["a = 7","b = 2","println(a + b)","println(a * b)","println(a % b)"],
    str:['name = "Sara"','println("Hello, " * name * "!")',"println(length(name))"],
    logic:["age = 20","has_id = true","if age >= 18 && has_id",'  println("Allowed")',"else",'  println("Denied")',"end"]},
  scala:{cmt:"//",hello:'println("Hello")',
    arith:["val a = 7","val b = 2","println(a + b)","println(a * b)","println(a % b)"],
    str:['val name = "Sara"','println("Hello, " + name + "!")',"println(name.length)"],
    logic:["val age = 20","val hasId = true","if age >= 18 && hasId then",'  println("Allowed")',"else",'  println("Denied")']},
  haskell:{cmt:"--",hello:'putStrLn "Hello"',
    arith:["let a = 7 :: Int","let b = 2 :: Int","print (a + b)","print (a * b)","print (a `mod` b)"],
    str:['let name = "Sara"','putStrLn ("Hello, " ++ name ++ "!")',"print (length name)"],
    logic:["let age = 20 :: Int","let hasId = True","if age >= 18 && hasId",'  then putStrLn "Allowed"','  else putStrLn "Denied"']},
  elixir:{cmt:"#",hello:'IO.puts("Hello")',
    arith:["a = 7","b = 2","IO.puts(a + b)","IO.puts(a * b)","IO.puts(rem(a, b))"],
    str:['name = "Sara"','IO.puts("Hello, " <> name <> "!")',"IO.puts(String.length(name))"],
    logic:["age = 20","has_id = true","if age >= 18 and has_id do",'  IO.puts("Allowed")',"else",'  IO.puts("Denied")',"end"]}
};
PROFILE.nodejs = PROFILE.javascript;

/* لغات ليس لها ملف PROFILE: تعليقاتها مخصصة */
const COMMENT_ONLY = {
  html:{code:"<!-- هذا تعليق: لا يظهر في الصفحة -->\n<p>Hello</p>\n<!-- <p>هذه الفقرة مخفية</p> -->",output:"Hello",open:"<!--",close:"-->"},
  css:{code:"/* هذا تعليق: يتجاهله المتصفح */\nh1 { color: green; }\n/* h1 { color: red; } */",output:"العنوان يظهر باللون الأخضر لأن القاعدة الحمراء معطّلة بتعليق.",open:"/*",close:"*/"},
  sql:{code:"-- هذا تعليق من سطر واحد\nSELECT 'Hello';\n/* تعليق\n   من عدة أسطر */",output:"Hello",open:"--",close:"/* ... */"},
  react:{code:"// تعليق في كود JavaScript\nfunction App() {\n  return (\n    <div>\n      {/* تعليق داخل JSX */}\n      <h1>Hello</h1>\n    </div>\n  );\n}",output:"Hello",open:"//",close:"{/* ... */}"},
  vuejs:{code:"<template>\n  <!-- تعليق داخل القالب -->\n  <h1>Hello</h1>\n</template>\n\n<script setup>\n// تعليق داخل السكربت\n</script>",output:"Hello",open:"<!-- -->",close:"//"},
  angular:{code:"// تعليق في كود TypeScript\n@Component({\n  selector: 'app-root',\n  template: '<!-- تعليق --><h1>Hello</h1>'\n})\nexport class AppComponent {}",output:"Hello",open:"//",close:"<!-- -->"}
};

/* ---------- 4. أدوات بناء الدروس ---------- */
function outLines(id, key, plain) {
  const p = PROFILE[id];
  return p && p.fmt && p.fmt[key] ? [].concat(p.fmt[key]).join("\n") : plain;
}

function makeLesson(id, title, topic, code, output, note, theory) {
  return { id, title, topic, code: code || "", output: output || "", note: note || "", theory: !!theory };
}

/* ---------- 5. الدروس المقدمة ---------- */
function introLessons(language) {
  const n = language.name;
  const s = SETUP[language.id] || {how:"",install:"محرر نصوص",file:"main",cmd:""};
  const isMarkup = ["html","css"].includes(language.id);

  const l1 = makeLesson(language.id + "-i1", "ما هي البرمجة؟", {
    intro:"قبل أن تكتب أي سطر، دعنا نفهم ماذا نفعل أصلاً. لا تحتاج إلى أي خبرة سابقة، فنحن نبدأ من الصفر تماماً.",
    goals:["فهم معنى البرمجة والبرنامج","إدراك أن الحاسوب ينفذ ما تكتبه حرفياً","التعرف على فكرة الخوارزمية (الخطوات قبل الكود)"],
    concept:[
      "الحاسوب آلة سريعة جداً، لكنها لا تفهم شيئاً بنفسها: هي تنتظر تعليمات دقيقة ومرتبة. البرمجة هي كتابة هذه التعليمات، والمجموعة المرتبة منها تسمى «برنامجاً». كل تطبيق على هاتفك وكل موقع تزوره هو برنامج كتبه أحدهم.",
      "قبل كتابة الكود نفكر في الحل بالكلمات العادية، وتسمى هذه الخطوات «خوارزمية». إذا استطعت وصف الحل بخطوات واضحة فأنت تستطيع برمجته. أما " + n + " فهي وسيلتنا لكتابة تلك الخطوات بشكل يفهمه الحاسوب."
    ],
    analogy:"البرنامج كوصفة طبخ والحاسوب طباخ ينفذ الوصفة حرفياً: إن نسيت خطوة فلن يخمّن ما تقصده.",
    mistakes:["الاعتقاد بأن البرمجة تحتاج موهبة رياضية خاصة؛ هي مهارة تُكتسب بالتدريب مثل تعلم أي لغة.","الكتابة مباشرة دون التفكير في الخطوات أولاً."],
    task:"اكتب بكلماتك خطوات تحضير شطيرة، ثم اقرأها كأنك حاسوب لا يعرف شيئاً: هل ينقص خطوة؟",
    hint:"فكّر في أبسط الأشياء: فتح الكيس، إخراج الخبز، وضع الحشوة.",
    summary:["البرنامج تعليمات دقيقة ومرتبة.","الخوارزمية هي الحل بالكلمات قبل أن يصبح كوداً."],
    quiz:{question:"ما الخوارزمية؟",options:["خطوات مرتبة تحل مشكلة ما","اسم لغة برمجة","نوع من الحواسيب"],answer:0,explanation:"الخوارزمية وصف واضح ومرتب لخطوات الحل، ثم نكتبه بلغة برمجة."}
  }, "1. اغلِ الماء\n2. ضع الشاي في الكوب\n3. اسكب الماء الساخن\n4. انتظر 3 دقائق\n5. أضف السكر وحرّك", "", "هذه خوارزمية لصنع الشاي: كل خطوة واضحة، والترتيب مهم. هذا ما نفعله في البرمجة تماماً.", true);

  const l2 = makeLesson(language.id + "-i2", "كيف يفهم الحاسوب كودك؟", {
    intro:"الحاسوب لا يقرأ العربية ولا الإنجليزية، فكيف يفهم ما تكتبه؟ هذا الدرس يجيب عن ذلك ببساطة.",
    goals:["معرفة أن الحاسوب لا يفهم إلا لغة الآلة","فهم الفرق بين المترجم والمفسر","معرفة كيف تعمل " + n + " تحديداً"],
    concept:[
      "الحاسوب لا يفهم إلا الأصفار والواحدات (لغة الآلة). ونحن نكتب بلغات قريبة من لغتنا، ثم تتولى أداة تحويلها: «المترجم» يحول البرنامج كله دفعة واحدة إلى ملف تنفيذي، و«المفسر» ينفذ الكود سطراً بسطر.",
      s.how
    ],
    analogy:"المترجم كمن يترجم كتاباً كاملاً ثم يسلمه لك، والمفسر كمترجم فوري يترجم كل جملة وهي تُقال.",
    mistakes:["الظن أن الحاسوب «يفهم قصدك»؛ هو ينفذ ما كتبته فقط.","الخلط بين المحرر (الذي تكتب فيه) وبين المترجم أو المفسر (الذي ينفذ)."],
    task:"قل بصوت عالٍ: هل " + n + " تحتاج إلى ترجمة أولاً أم تُنفَّذ مباشرة؟ ولماذا؟",
    hint:"أعد قراءة الفقرة الثانية في «الفكرة ببساطة».",
    summary:["الحاسوب لا يفهم إلا لغة الآلة.","المترجم أو المفسر يحول كودك إلى ما يفهمه الحاسوب."],
    quiz:{question:"ما دور المفسر؟",options:["تنفيذ الكود سطراً بسطر","تصميم الشاشة","تخزين الملفات"],answer:0,explanation:"المفسر يقرأ الكود وينفذه خطوة بخطوة، بينما المترجم يحوله كله قبل التشغيل."}
  }, "كودك  →  مترجم أو مفسر  →  لغة الآلة  →  الحاسوب ينفذ", "", "هذه هي الرحلة التي يقطعها أي سطر تكتبه قبل أن يظهر أثره.", true);

  const l3 = makeLesson(language.id + "-i3", "تجهيز بيئة " + n, {
    intro:"حان وقت تجهيز مكان العمل. لا تقلق: الأمر أبسط مما يبدو، وهو خطوات تفعلها مرة واحدة فقط.",
    goals:["معرفة ما تحتاجه لتشغيل " + n,"إنشاء أول ملف بالامتداد الصحيح","معرفة أمر التشغيل"],
    concept:[
      "تحتاج إلى ثلاثة أشياء فقط: محرر نصوص تكتب فيه (مثل VS Code)، وأداة تشغيل هي: " + s.install + "، وملف كود باسم مثل " + s.file + ".",
      isMarkup ? "هنا لا تحتاج إلى برنامج إضافي؛ المتصفح يكفي. وفي هذا الموقع يمكنك أيضاً تجربة الكود مباشرة من قسم «جرّب بنفسك» دون تثبيت." : "إن لم تُرد تثبيت شيء الآن فلا بأس: ابحث عن محرر أونلاين يدعم " + n + " (ابحث عن «" + n + " online compiler»)، وانسخ إليه الأكواد من دروسنا."
    ],
    analogy:"كتجهيز مطبخك قبل الطبخ: الأدوات أولاً، ثم نبدأ بالوصفات.",
    mistakes:["حفظ الملف بامتداد خاطئ مثل .txt فلا تعمل الأوامر عليه.","تشغيل الأمر من مجلد غير الذي فيه ملفك."],
    task:"أنشئ ملفاً باسم " + s.file + " في مجلد جديد، ثم حاول تنفيذ الأمر المذكور في المثال.",
    hint:"ابدأ بالأمر الأول فقط، وإن ظهر خطأ فابحث عن نصه حرفياً في الإنترنت.",
    summary:["محرر + أداة تشغيل + ملف بالامتداد الصحيح.","التجهيز يتم مرة واحدة فقط."],
    quiz:{question:"ماذا تحتاج لتبدأ؟",options:["محرر نصوص وأداة تشغيل","خادماً ضخماً","شهادة جامعية"],answer:0,explanation:"محرر نصوص وأداة التشغيل المناسبة يكفيان للبدء."}
  }, "ملف الكود: " + s.file + "\n\nالتشغيل:\n" + s.cmd, "", "هذا هو الأمر الذي ستستخدمه كلما أردت تجربة كودك على جهازك.", true);

  return [l1, l2, l3];
}

/* ---------- 6. دروس إضافية حسب اللغة ---------- */
function commentsLesson(language) {
  const id = language.id;
  const co = COMMENT_ONLY[id];
  const p = PROFILE[id];
  let code, output, mark;

  if (co) {
    code = co.code; output = co.output; mark = co.open;
  } else {
    code = wrapCode(id, [p.cmt + " This is a comment", p.hello, p.cmt + " This line is ignored too"]);
    output = outLines(id, "hello", "Hello");
    mark = p.cmt;
  }

  return makeLesson(id + "-c", "التعليقات: ملاحظات لا ينفذها الحاسوب", {
    intro:"كلما كبر برنامجك صعب تذكر سبب كتابة كل جزء. التعليقات تحل ذلك: ملاحظات تكتبها لنفسك ولغيرك.",
    goals:["فهم الغرض من التعليقات","معرفة رمز التعليق في " + language.name,"تعطيل سطر مؤقتاً بتحويله إلى تعليق"],
    concept:[
      "التعليق نص يتجاهله الحاسوب تماماً، فلا يؤثر على عمل البرنامج. نستخدمه لشرح لماذا فعلنا شيئاً، لا ماذا فعلنا (فالكود يقول ماذا).",
      "رمز التعليق في هذه اللغة هو: " + mark + ". ويستخدمه المبرمجون أيضاً لتعطيل سطر مؤقتاً دون حذفه."
    ],
    analogy:"كملاحظات تكتبها بالقلم على هامش كتاب: هي لك، والكتاب نفسه لا يتغير.",
    mistakes:["الإكثار من التعليقات الواضحة مثل «اطبع كلمة»؛ اكتب ما لا يظهر من الكود فقط.","نسيان إغلاق التعليق متعدد الأسطر فيتحول باقي الكود إلى تعليق."],
    task:"أضف تعليقاً فوق السطر الأهم يشرح هدفه، ثم حوّل أحد الأسطر إلى تعليق وانظر كيف تتغير النتيجة.",
    hint:"ضع رمز التعليق في بداية السطر المراد تعطيله.",
    summary:["التعليقات للبشر والكود للحاسوب.","اكتب «لماذا» وليس «ماذا»."],
    quiz:{question:"ماذا يفعل الحاسوب بالتعليقات؟",options:["يتجاهلها","ينفذها","يحذف الملف"],answer:0,explanation:"التعليقات ملاحظات للقارئ ولا تؤثر على التنفيذ."}
  }, code, output, "الأسطر التي تبدأ برمز التعليق لا تُنفَّذ، ولذلك لا يظهر منها شيء في المخرجات.", false);
}

function arithLesson(language) {
  const id = language.id, p = PROFILE[id];
  if (!p) return null;
  const mod = {r:"%%",haskell:"mod",elixir:"rem"}[id] || "%";
  return makeLesson(id + "-a", "العمليات الحسابية", {
    intro:"الحاسوب في أصله آلة حاسبة عملاقة. سنتعلم هنا كيف نطلب منه الجمع والضرب وغيرهما.",
    goals:["استخدام الجمع والطرح والضرب والقسمة","فهم عامل باقي القسمة","معرفة أن الترتيب والأقواس يؤثران في النتيجة"],
    concept:[
      "العمليات الأساسية: + للجمع، - للطرح، * للضرب، / للقسمة. وهناك عملية مفيدة جداً هي باقي القسمة، وتُكتب في " + language.name + " هكذا: " + mod + ".",
      "كما في الرياضيات: الضرب والقسمة قبل الجمع والطرح، والأقواس تغيّر الترتيب. فالتعبير 2 + 3 * 4 يساوي 14، أما (2 + 3) * 4 فيساوي 20."
    ],
    analogy:"باقي القسمة كتوزيع 7 حبات على شخصين: لكل شخص 3 ويبقى حبة واحدة.",
    mistakes:["نسيان أن بعض اللغات تعطي قسمة الأعداد الصحيحة عدداً صحيحاً (7 / 2 تعطي 3 وليس 3.5).","نسيان الأقواس فتتغير النتيجة."],
    task:"غيّر قيمة a إلى 10 وb إلى 3 وتوقع النتائج قبل التشغيل، ثم أضف سطراً يطبع (a + b) * 2.",
    hint:"انسخ سطر الطباعة وضع التعبير الجديد داخل الأقواس.",
    summary:["+ و - و * و / عمليات الحساب الأساسية.","عامل الباقي يفيد في معرفة الزوجي والفردي."],
    quiz:{question:"ما ناتج 2 + 3 * 4 ؟",options:["14","20","24"],answer:0,explanation:"الضرب يُنفَّذ أولاً: 3 * 4 = 12 ثم 2 + 12 = 14."}
  }, wrapCode(id, p.arith), outLines(id, "arith", "9\n14\n1"), "السطر الأول يجمع 7 و2 فيعطي 9، والثاني يضربهما فيعطي 14، والثالث يعطي باقي قسمة 7 على 2 وهو 1.", false);
}

function stringsLesson(language) {
  const id = language.id, p = PROFILE[id];
  if (!p) return null;
  return makeLesson(id + "-s", "النصوص: دمجها وقياس طولها", {
    intro:"النصوص موجودة في كل مكان: الأسماء والرسائل وعناوين المقالات. لنتعلم كيف نتعامل معها.",
    goals:["كتابة نص بين علامتي اقتباس","دمج نصين أو أكثر","معرفة عدد حروف النص"],
    concept:[
      "النص (String) سلسلة من الحروف نكتبها بين علامتي اقتباس. ويمكن دمج النصوص معاً لنصنع رسالة كاملة من أجزاء، كأن نجمع «Hello» مع اسم المستخدم.",
      "لكل نص طول هو عدد حروفه بما فيها المسافات. ويفيدنا مثلاً للتحقق من أن كلمة السر ليست قصيرة جداً."
    ],
    analogy:"النص كقطار من العربات: كل حرف عربة، والدمج هو ربط قطارين معاً.",
    mistakes:["نسيان علامة الاقتباس الثانية.","الخلط بين الرقم 5 والنص «5» فيتصرف كل منهما بشكل مختلف."],
    task:"غيّر الاسم إلى اسمك، وتوقع الطول الجديد قبل التشغيل.",
    hint:"عدّ حروف اسمك بنفسك ثم قارن مع ناتج البرنامج.",
    summary:["النص يُكتب بين علامتي اقتباس.","الدمج يصنع رسائل ديناميكية، والطول يعدّ الحروف."],
    quiz:{question:"ما طول النص «Sara» ؟",options:["4","3","5"],answer:0,explanation:"النص يتكون من 4 حروف: S وa وr وa."}
  }, wrapCode(id, p.str), outLines(id, "str", "Hello, Sara!\n4"), "السطر الأول يخزن الاسم، والثاني يدمجه مع كلمة الترحيب، والثالث يطبع عدد حروف الاسم.", false);
}

function logicLesson(language) {
  const id = language.id, p = PROFILE[id];
  if (!p) return null;
  return makeLesson(id + "-l", "العوامل المنطقية: «و» و«أو» و«ليس»", {
    intro:"في الحياة نقرر بناءً على أكثر من شرط: «إن كان عمرك 18 وعندك هوية يمكنك الدخول». لنعبّر عن ذلك بالكود.",
    goals:["الجمع بين شرطين بـ «و»","استخدام «أو» و«ليس»","توقع نتيجة شرط مركب"],
    concept:[
      "«و» (AND) تعطي صح فقط إذا تحقق الشرطان معاً. «أو» (OR) تعطي صح إذا تحقق أحدهما على الأقل. «ليس» (NOT) تعكس النتيجة: الصح يصبح خطأ والعكس.",
      "في المثال أدناه نفحص شرطين معاً: العمر وإبراز الهوية. إن فشل أحدهما ينفذ المسار البديل."
    ],
    analogy:"«و» كبابين متتاليين يجب فتحهما كليهما، و«أو» كبابين يكفي أن تفتح أحدهما.",
    mistakes:["استخدام «أو» بدل «و» فيدخل من لا يحق له.","كتابة شرط مركب طويل دون أقواس فيصعب فهمه."],
    task:"غيّر قيمة العمر إلى 15 وتوقع الناتج، ثم غيّر الهوية إلى خطأ مع عمر 20.",
    hint:"في الحالتين يفشل أحد الشرطين، فماذا يعني ذلك مع «و»؟",
    summary:["«و» تحتاج الشرطين معاً.","«أو» يكفيها شرط واحد."],
    quiz:{question:"متى تعطي «و» نتيجة صح؟",options:["عندما يتحقق الشرطان معاً","عندما يتحقق أحدهما","دائماً"],answer:0,explanation:"«و» لا تكون صحيحة إلا إذا صحّ طرفاها معاً."}
  }, wrapCode(id, p.logic), outLines(id, "logic", "Allowed"), "العمر 20 (أكبر من 18) والهوية موجودة، فتحقق الشرطان معاً وظهرت رسالة السماح.", false);
}

function errorsLesson(language) {
  return makeLesson(language.id + "-e", "كيف تقرأ الأخطاء وتصلحها", {
    intro:"سترتكب أخطاء كثيرة، وهذا طبيعي جداً: حتى المحترفون يخطئون كل يوم. المهم أن تتعلم قراءتها.",
    goals:["التمييز بين أنواع الأخطاء","قراءة رسالة الخطأ بهدوء","معرفة طريقة منهجية لإصلاح الخطأ"],
    concept:[
      "هناك ثلاثة أنواع: خطأ الكتابة (Syntax) يمنع البرنامج من العمل أصلاً، كنسيان قوس. وخطأ التشغيل (Runtime) يظهر أثناء التنفيذ، كالقسمة على صفر. وخطأ المنطق يعمل فيه البرنامج لكن نتيجته خاطئة، وهو أصعبها.",
      "رسالة الخطأ صديقتك: تخبرك عادةً بنوع الخطأ ورقم السطر. ابدأ من أول خطأ دائماً لأنه قد يسبب بقية الأخطاء، وإن لم تفهم الرسالة فانسخها وابحث عنها."
    ],
    analogy:"كالطبيب: لا يعالج قبل أن يقرأ الأعراض. رسالة الخطأ هي الأعراض.",
    mistakes:["تجاهل رسالة الخطأ وتغيير الكود عشوائياً.","تغيير عدة أشياء دفعة واحدة فلا تعرف ما الذي أصلح المشكلة."],
    task:"عمداً احذف علامة اقتباس أو قوساً من أحد أمثلة الدروس السابقة، وشغّله، واقرأ رسالة الخطأ: ماذا قالت؟",
    hint:"انظر إلى رقم السطر في الرسالة، فالخطأ غالباً هناك أو قبله بقليل.",
    summary:["الأخطاء جزء طبيعي من التعلم.","اقرأ الرسالة، وابدأ بأول خطأ، وغيّر شيئاً واحداً في كل مرة."],
    quiz:{question:"ما أول ما تفعله عند ظهور خطأ؟",options:["قراءة الرسالة ورقم السطر","حذف الملف","إعادة تثبيت الجهاز"],answer:0,explanation:"الرسالة تحدد غالباً مكان المشكلة ونوعها."}
  }, "", "", "", true);
}

function nextStepsLesson(language) {
  return makeLesson(language.id + "-n", "كيف تواصل التعلم بعد هذا المسار", {
    intro:"أنهيت الأساسيات، والسؤال الآن: كيف تتحول من متعلم إلى مبرمج يبني أشياء حقيقية؟",
    goals:["معرفة طريقة تدريب فعّالة","اختيار مشاريع صغيرة مناسبة","بناء عادة تعلم مستمرة"],
    concept:[
      "السر هو التطبيق: اقرأ قليلاً واكتب كثيراً. ابنِ مشاريع صغيرة تنتهي بسرعة، مثل آلة حاسبة، أو لعبة تخمين رقم، أو قائمة مهام. كل مشروع صغير يعلمك أكثر من ساعات المشاهدة.",
      "لا تحفظ الأكواد، بل افهم الفكرة وابحث عن الصيغة عند الحاجة، فهذا ما يفعله الجميع. وخصص نصف ساعة يومياً بدل ست ساعات في يوم واحد، فالاستمرار يغلب الاندفاع."
    ],
    analogy:"كتعلم السباحة: لن تتعلمها بقراءة الكتب فقط، بل بالنزول إلى الماء كل يوم.",
    mistakes:["الانتقال من دورة إلى دورة دون بناء أي مشروع.","المقارنة بمن لهم سنوات خبرة فتفقد الحماس."],
    task:"اختر مشروعاً صغيراً بـ " + language.name + " واكتب في ورقة خمس خطوات لتنفيذه، ثم ابدأ بالخطوة الأولى اليوم.",
    hint:"المشروع الصغير هو الذي تنهيه في جلسة أو جلستين.",
    summary:["التطبيق أهم من الحفظ.","استمر يومياً ولو قليلاً."],
    quiz:{question:"ما أفضل طريقة لتحسين مهارتك؟",options:["بناء مشاريع صغيرة باستمرار","حفظ الأكواد كلها","قراءة دون كتابة"],answer:0,explanation:"التطبيق العملي المتكرر هو أسرع طريق لإتقان البرمجة."}
  }, "", "", "", true);
}

/* ---------- 7. الترتيب النهائي للدروس ---------- */
/* existing: الدروس الستة الأصلية بالترتيب:
   0 أول برنامج، 1 المتغيرات، 2 الشروط، 3 الحلقات، 4 الدوال، 5 المجموعات */
function composeLessons(language, existing) {
  const intro = introLessons(language);
  const comments = commentsLesson(language);
  const arith = arithLesson(language);
  const str = stringsLesson(language);
  const logic = logicLesson(language);
  const errors = errorsLesson(language);
  const next = nextStepsLesson(language);

  const e = existing;
  const list = [
    ...intro,
    e[0], comments, e[1],
    arith, str,
    e[2], logic,
    e[3], e[4], e[5],
    errors, next
  ];

  return list.filter(Boolean);
}
