// 课程数据（模板驱动：新增课程只需在此数组追加一条 JSON）
// 字段：id, eyebrow, title, subtitle, analogyTitle, analogyBody, concepts[], examples[], task, initialCode, answer, expected, hints[], exercises[]
window.COURSES = [
  {
    id: "l0-1",
    eyebrow: "第 1 关 · 你好，世界",
    title: "让 Python 开口说话",
    subtitle: "第一行代码：print",
    analogyTitle: "给世界打个招呼",
    analogyBody: "程序就像一份菜谱，一步步告诉电脑做什么；print 就像把一句话大声说出来，让屏幕显示给你看。",
    concepts: [
      { term: "print()", desc: "把括号里的内容显示在屏幕上" },
      { term: "字符串", desc: "用引号包起来的一串文字，比如 \"你好\"" },
      { term: "\\n", desc: "换行符：让后面的内容换到下一行" }
    ],
    examples: [
      { title: "打印一句话", code: "print(\"你好，世界\")", output: "你好，世界" },
      { title: "打印数字", code: "print(3)", output: "3" }
    ],
    task: "皮皮第一次见到你，想大声打个招呼。用 print 让屏幕显示这一行：你好，世界",
    initialCode: "# 在这里写代码\n",
    answer: "print(\"你好，世界\")",
    expected: "你好，世界",
    hints: [
      "思路：用 print 把文字显示出来",
      "细节：文字要用英文双引号 \"\" 包起来",
      "答案：print(\"你好，世界\")"
    ],
    exercises: [
      { tier: "热身", task: "用 print 输出：你好", initialCode: "# 写代码\n", expected: "你好", answer: "print(\"你好\")", hint: "把要显示的文字用引号包住，放进 print 后面的括号里，注意要用英文引号。" },
      { tier: "巩固", task: "用三个 print 分别输出：你好、代码、大陆，每行一个", initialCode: "# 写代码\n", expected: "你好\n代码\n大陆", answer: "print(\"你好\")\nprint(\"代码\")\nprint(\"大陆\")", hint: "三个 print 就是三次输出，每次只放一段文字，三行的先后顺序别搞反。" },
      { tier: "挑战", task: "只用一条 print，一次输出三行：皮皮、欢迎你、来到代码大陆（换行要自己想办法）", initialCode: "# 写代码\n", expected: "皮皮\n欢迎你\n来到代码大陆", answer: "print(\"皮皮\\n欢迎你\\n来到代码大陆\")  ——  \\n 是换行符，写两个字符就行", hint: "三段文字塞进同一个 print，中间用 \\n 断开，它就会自动换行输出。" }
    ]
  },
  {
    id: "l0-2",
    eyebrow: "第 2 关 · 数字的魔法",
    title: "让 Python 帮你算账",
    subtitle: "加减乘除四则运算",
    analogyTitle: "帮药水铺算一笔账",
    analogyBody: "魔杖 30 金币，咒语书 18 金币。Python 就是你的计算器：+ 加、- 减、* 乘、/ 除，直接写出算式就能得到结果。",
    concepts: [
      { term: "+", desc: "加" }, { term: "-", desc: "减" }, { term: "*", desc: "乘" }, { term: "/", desc: "除" }
    ],
    examples: [
      { title: "加法", code: "print(30 + 18)", output: "48" },
      { title: "乘法", code: "print(7 * 8)", output: "56" }
    ],
    task: "你在药水铺买了魔杖（30 金币）和咒语书（18 金币）。用一条算式算出总价，并让屏幕只输出这个数字。",
    initialCode: "# 在这里写代码\n",
    answer: "print(30 + 18)",
    expected: "48",
    hints: [
      "思路：把 30 + 18 写进 print 里",
      "细节：print 里直接写算式，不加引号",
      "答案：print(30 + 18)"
    ],
    exercises: [
      { tier: "热身", task: "输出 7 × 8 的结果", initialCode: "# 写代码\n", expected: "56", answer: "乘法用 *：print(7 * 8)", hint: "乘号在键盘上是星号 *，别写成字母 x，把两个数字用 * 连起来再输出。" },
      { tier: "巩固", task: "苹果 6 元一个，买 4 个一共多少钱？用算式输出结果", initialCode: "# 写代码\n", expected: "24", answer: "买 4 个就是 6 乘 4：print(6 * 4)", hint: "求总价用乘法：单价和数量之间用 * 连接，一条算式就能出结果。" },
      { tier: "挑战", task: "一个文具盒 15 元，买 3 个，付给老板 100 元，应该找回多少钱？用一条算式输出", initialCode: "# 写代码\n", expected: "55", answer: "print(100 - 15 * 3)  —— 先算乘除，再算加减", hint: "思路是先用乘法算出 3 个文具盒的钱，再从 100 里减掉，乘除优先于加减，不用加括号。" }
    ]
  },
  {
    id: "l0-2b",
    eyebrow: "第 3 关 · 分苹果剩几个",
    title: "整除 // 与取余 %",
    subtitle: "除法的两种结果",
    analogyTitle: "分苹果",
    analogyBody: "把 17 个苹果分给 5 人：// 求每人几个（整除）、% 求剩几个（取余）。两个符号是一对搭档，别搞混。",
    concepts: [
      { term: "//", desc: "整除：去掉小数，求商" },
      { term: "%", desc: "取余：除完剩下的数" }
    ],
    examples: [
      { title: "整除与取余", code: "print(17 // 5)\nprint(17 % 5)", output: "3\n2" }
    ],
    task: "17 个苹果要平均分给 5 个人。用整除 // 算出「每人能分到几个」，并输出这个数字。",
    requireCode: "17\\s*//\\s*5",
    requireMsg: "题目要求用整除 //。注意：// 整除（去小数）用两个斜杠，% 取余（留余数），别用错。",
    initialCode: "# 在这里写代码\n",
    answer: "print(17 // 5)",
    expected: "3",
    hints: ["思路：// 是整除，结果去掉小数", "判断奇偶：n % 2，余 0 是偶数", "答案：print(17 // 5)"],
    exercises: [
      { tier: "热身", task: "输出 20 // 6 的结果", initialCode: "# 写代码\n", expected: "3", answer: "print(20 // 6)", hint: "整除写成两个斜杠，少写一个就变成普通除法，结果会带上小数点。", requireCode: "20\\s*//\\s*6", requireMsg: "用整除 //。20//6=3。" },
      { tier: "巩固", task: "输出 20 % 6 的结果", initialCode: "# 写代码\n", expected: "2", answer: "print(20 % 6)", hint: "百分号在这里是取余，算的是除完以后剩下来的部分，别当成百分比。", requireCode: "20\\s*%\\s*6", requireMsg: "用取余 %。20%6=2。" },
      { tier: "挑战", task: "一箱饮料 43 瓶，每 6 瓶装一盒。能装满几盒？还剩几瓶？（分两行输出）", initialCode: "# 写代码\n", expected: "7\n1", answer: "print(43 // 6)\nprint(43 % 6)", hint: "装满几盒用 // 求商，剩几瓶用 % 求余，两次结果分两行输出。", requireCode: "43\\s*//\\s*6", requireMsg: "分别用 // 求盒数、% 求剩余。" }
    ]
  },
  {
    id: "l0-2c",
    eyebrow: "第 4 关 · 乘方的魔力",
    title: "乘方 ** 与运算优先级",
    subtitle: "** 与括号",
    analogyTitle: "指数的叠叠乐",
    analogyBody: "2 ** 10 表示 2 连乘 10 次。运算有先后：括号 > 乘方 > 乘除 > 加减。",
    concepts: [
      { term: "**", desc: "乘方：a 的 b 次方" },
      { term: "优先级", desc: "括号 > 乘方 > 乘除 > 加减" }
    ],
    examples: [
      { title: "乘方", code: "print(2 ** 10)", output: "1024" }
    ],
    task: "传说点亮符文需要「2 连乘 10 次」的能量。用乘方 ** 算出这个能量值，并输出。",
    requireCode: "2\\s*\\*\\*\\s*10",
    requireMsg: "乘方用两个星号 **。2 ** 10 = 1024。",
    initialCode: "# 在这里写代码\n",
    answer: "print(2 ** 10)",
    expected: "1024",
    hints: ["思路：** 是乘方", "细节：2**10 是 10 个 2 相乘", "答案：print(2 ** 10)"],
    exercises: [
      { tier: "热身", task: "输出 3 的平方（3 ** 2）", initialCode: "# 写代码\n", expected: "9", answer: "print(3 ** 2)", hint: "乘方用两个星号连着写，不是键盘上的 ^，底数在前、次数在后。", requireCode: "3\\s*\\*\\*\\s*2", requireMsg: "用 **。3**2=9。" },
      { tier: "巩固", task: "输出 5 的立方（5 ** 3）", initialCode: "# 写代码\n", expected: "125", answer: "print(5 ** 3)", hint: "求立方还是乘方那一套写法，底数写在前，后面的次数填 3 就行。", requireCode: "5\\s*\\*\\*\\s*3", requireMsg: "用 **。5**3=125。" },
      { tier: "挑战", task: "一个细菌每 20 分钟分裂成 2 个。2 小时后一共有多少个？（提示：2 小时 = 6 个 20 分钟，也就是 2 的 6 次方）", initialCode: "# 写代码\n", expected: "64", answer: "print(2 ** 6)", hint: "每 20 分钟翻一倍，6 次就是 6 个 2 连乘，用乘方一步表示比连写好得多。", requireCode: "2\\s*\\*\\*\\s*6", requireMsg: "用乘方 ** 表示连续翻倍 6 次。" }
    ]
  },
  {
    id: "l0-3",
    eyebrow: "第 5 关 · 文字的拼接",
    title: "把词语串成一句话",
    subtitle: "字符串的拼接",
    analogyTitle: "串珠子的项链",
    analogyBody: "字符串像一条珠子串成的项链，每个字是一颗珠子。用 + 可以把两串文字拼在一起。",
    concepts: [
      { term: "+ 拼接", desc: "把两段文字拼成一段" },
      { term: "* 重复", desc: "把一段文字重复多次" }
    ],
    examples: [
      { title: "拼接", code: "print(\"早\" + \"上好\")", output: "早上好" },
      { title: "重复", code: "print(\"哈\" * 3)", output: "哈哈哈" }
    ],
    task: "皮皮说话一顿一顿的：先说了「早」，又说了「上好」。把这两段文字拼起来，输出这一句：早上好",
    initialCode: "# 在这里写代码\n",
    answer: "print(\"早\" + \"上好\")",
    expected: "早上好",
    hints: [
      "思路：用 + 把两段文字拼起来",
      "细节：两段文字都要用英文引号包起来",
      "答案：print(\"早\" + \"上好\")"
    ],
    exercises: [
      { tier: "热身", task: "输出\"加油\"重复 3 遍", initialCode: "# 写代码\n", expected: "加油加油加油", answer: "重复用 *：print(\"加油\" * 3)", hint: "让整段文字重复用 *：文字放前面，重复几遍的数字放后面。" },
      { tier: "巩固", task: "把\"加油\"重复 3 遍，再拼上\"！\"输出（先用重复再用拼接）", initialCode: "# 写代码\n", expected: "加油加油加油！", answer: "print(\"加油\" * 3 + \"！\")", hint: "重复和拼接是两个动作：先用 * 把文字复制几份，再用 + 接上后面的内容。" },
      { tier: "挑战", task: "做一个标题框：第一行是 10 个等号，第二行是「代码大陆」，第三行又是 10 个等号（等号不要一个个敲）", initialCode: "# 写代码\n", expected: "==========\n代码大陆\n==========", answer: "print(\"=\" * 10)\nprint(\"代码大陆\")\nprint(\"=\" * 10)", hint: "等号不用手敲十遍，用 * 让一个等号重复 10 次，上下两行各来一次。", requireCode: "\\*\\s*10", requireMsg: "分割线要用 * 重复生成，不要手动敲一串等号。" }
    ]
  },
  {
    id: "l0-4",
    eyebrow: "第 6 关 · 贴标签的盒子",
    title: "用变量记住东西",
    subtitle: "变量与赋值",
    analogyTitle: "贴了名字标签的盒子",
    analogyBody: "变量像一个贴了名字标签的盒子：把东西放进盒子，喊名字就能拿出来。name = \"小明\" 就是把\"小明\"放进叫 name 的盒子里。",
    concepts: [
      { term: "变量", desc: "一个带名字的盒子，用来存值" },
      { term: "=", desc: "赋值，把右边的值放进左边的变量里" }
    ],
    examples: [
      { title: "存文字", code: "name = \"小明\"\nprint(name)", output: "小明" },
      { title: "存数字", code: "age = 18\nprint(age)", output: "18" }
    ],
    task: "给一位新朋友做块名字牌：把「小明」这个名字存进一个变量，再让屏幕把变量里的名字输出来。",
    initialCode: "# 在这里写代码\n",
    answer: "name = \"小明\"\nprint(name)",
    expected: "小明",
    hints: [
      "思路：先赋值，再打印变量",
      "细节：文字要加引号，变量名不加引号",
      "答案：name = \"小明\"\nprint(name)"
    ],
    exercises: [
      { tier: "热身", task: "把\"小红\"存进变量 name 并输出", initialCode: "# 写代码\n", expected: "小红", answer: "name = \"小红\"\nprint(name)", hint: "先给变量起个名字，用 = 把文字装进去，再输出这个变量名本身。" },
      { tier: "巩固", task: "一本书 25 元，买 4 本，另付 8 元运费。用变量存单价，输出总花费", initialCode: "# 写代码\n", expected: "108", answer: "price = 25\nprint(price * 4 + 8)", hint: "单价先存进变量，算钱时直接用变量名参与算式：数量相乘后再加上运费。" },
      { tier: "挑战", task: "交换 a、b 两个变量的值（a=1,b=2 → 输出 2 1），用第三个变量中转", initialCode: "a = 1\nb = 2\n# 在这里交换\n", expected: "2 1", answer: "tmp = a\na = b\nb = tmp\nprint(a, b)", hint: "借第三个变量中转：先把 a 的值存下来，再把 b 给 a，最后把存下的那份给 b。" }
    ]
  },
  {
    id: "l0-5",
    eyebrow: "第 7 关 · 数字与文字的区别",
    title: "认识数据的类型",
    subtitle: "int 与 str",
    analogyTitle: "苹果和数字不一样",
    analogyBody: "东西有种类：苹果是水果、5 是数字、\"5\"是文字。种类不同，用法就不同——数字能算账，文字能拼接。",
    concepts: [
      { term: "int", desc: "整数，没有小数点的数" },
      { term: "str", desc: "字符串，用引号包起来的文字" },
      { term: "type()", desc: "查看一个东西是什么类型" }
    ],
    examples: [
      { title: "看类型", code: "print(type(5))\nprint(type(\"5\"))", output: "<class 'int'>\n<class 'str'>" },
      { title: "数字 vs 文字", code: "print(1 + 1)\nprint(\"1\" + \"1\")", output: "2\n11" }
    ],
    task: "你捡到两块矿石：一块是数字 5，一块是文字「5」。用 type() 看看数字 5 是什么类型，并输出结果。",
    initialCode: "# 在这里写代码\n",
    answer: "print(type(5))",
    expected: "<class 'int'>",
    hints: [
      "思路：用 type() 查看类型",
      "细节：type 里写 5，不加引号",
      "答案：print(type(5))"
    ],
    exercises: [
      { tier: "热身", task: "输出\"你好\"的类型", initialCode: "# 写代码\n", expected: "<class 'str'>", answer: "print(type(\"你好\"))", hint: "type() 能查出一个东西是什么类型，把要查的内容放进它的括号里再输出。" },
      { tier: "巩固", task: "把字符串\"25\"转成数字，再加 5 输出", initialCode: "# 写代码\n", expected: "30", answer: "print(int(\"25\") + 5)", hint: "引号包着的 25 其实是文字，先用 int() 转成整数，才能跟 5 相加。" },
      { tier: "挑战", task: "分别输出字符串 \"100\" 和数字 100 的类型（分两行）", initialCode: "# 写代码\n", expected: "<class 'str'>\n<class 'int'>", answer: "print(type(\"100\"))\nprint(type(100))", hint: "同样写 100，加引号和不加引号类型不同，两次 type() 各查一个，分两行输出。" }
    ]
  },
  {
    id: "l0-6",
    eyebrow: "第 8 关 · 换包装",
    title: "数字与文字互相转换",
    subtitle: "int() / str() / float()",
    analogyTitle: "给数据换个包装",
    analogyBody: "类型转换像\"换包装\"：把写着数字的纸条（字符串）换成真正的数字，才能算账。int(\"25\") 得到数字 25。",
    concepts: [
      { term: "int()", desc: "把字符串转成整数，如 int(\"25\") → 25" },
      { term: "str()", desc: "把数字转成字符串，如 str(18) → \"18\"" },
      { term: "float()", desc: "把字符串转成小数，如 float(\"4.5\") → 4.5" }
    ],
    examples: [
      { title: "字符串转数字", code: "print(int(\"25\") + 5)", output: "30" },
      { title: "数字转字符串", code: "print(str(99) + \"分\")", output: "99分" }
    ],
    task: "宝箱上刻着「25」，但那其实是一段文字（字符串），得先变成真正的数字才能加 5 开锁。请输出算好的结果。",
    initialCode: "# 在这里写代码\n",
    answer: "print(int(\"25\") + 5)",
    expected: "30",
    hints: ["思路：先用 int() 把\"25\"变成数字", "细节：int(\"25\") 是数字，+ 5 是算术", "答案：print(int(\"25\") + 5)"],
    exercises: [
      { tier: "热身", task: "把\"18\"转成数字，再加 2 输出", initialCode: "# 写代码\n", expected: "20", answer: "print(int(\"18\") + 2)", hint: "文字形式的数字不能直接参与加法，先套一层 int() 把它变成整数。" },
      { tier: "巩固", task: "把数字 99 转成文字，再拼上\"分\"输出", initialCode: "# 写代码\n", expected: "99分", answer: "print(str(99) + \"分\")", hint: "数字和文字不能直接相加：先用 str() 把数字变成文字，再拼接。" },
      { tier: "挑战", task: "香蕉单价是文字 \"12.5\" 元一斤，买 4 斤，输出总价", initialCode: "# 写代码\n", expected: "50.0", answer: "print(float(\"12.5\") * 4)", hint: "带小数点的文字要先过 float() 变成小数，再乘斤数，结果自然带小数位。", requireCode: "float\\s*\\(", requireMsg: "先用 float() 把文字 \"12.5\" 变成小数，再乘 4。" }
    ]
  },
  {
    id: "l0-7",
    eyebrow: "第 9 关 · 写便签",
    title: "给代码写便签",
    subtitle: "注释 #",
    analogyTitle: "便签",
    analogyBody: "注释像便签，写给自己或别人看，电脑会跳过它。好代码都要写好注释。",
    concepts: [
      { term: "#", desc: "# 后面是注释，电脑不看" },
      { term: "注释", desc: "写给人的说明，程序跳过" }
    ],
    examples: [
      { title: "注释", code: "# 这是打招呼程序\nprint(\"你好\")", output: "你好" }
    ],
    task: "好代码要留便签，方便明天的自己看懂。先写一行注释说明这是打招呼程序，再让屏幕输出这一行：你好，代码大陆",
    initialCode: "# 在这里写代码\n",
    answer: "# 这是打招呼\nprint(\"你好，代码大陆\")",
    expected: "你好，代码大陆",
    hints: ["思路：第一行写注释，第二行用 print", "细节：注释以 # 开头", "答案：\\n# 这是打招呼\\nprint(\"你好，代码大陆\")"],
    exercises: [
      { tier: "热身", task: "写一行注释，并打印\"开始\"", initialCode: "# 写代码\n", expected: "开始", answer: "# 注释\\nprint(\"开始\")", hint: "井号后面那一行字电脑直接跳过，注释不会出现在输出里，该打印的照旧打印。" },
      { tier: "巩固", task: "用注释标出两步（1存名字 2打印），再打印名字", initialCode: "# 写代码\n", expected: "小明", answer: "# 1 存名字\\nname = \"小明\"\\n# 2 打印\\nprint(name)", hint: "两处注释分别写在对应代码的上一行，井号后面的说明只是给人看的。" },
      { tier: "挑战", task: "先写一行注释说明这段代码干什么，再用变量存「皮皮」，最后输出：你好，我是皮皮", initialCode: "# 写代码\n", expected: "你好，我是皮皮", answer: "# 打招呼\nname = \"皮皮\"\nprint(\"你好，我是\" + name)", hint: "先用一行注释说明这段代码的作用，名字存进变量，再用 + 把问候语和变量名接起来。", requireCode: "name\\s*=", requireMsg: "要用变量存名字，再用 + 拼接输出。" }
    ]
  },
  {
    id: "l0-7b",
    eyebrow: "第 10 关 · 一层一层对齐",
    title: "缩进与代码块",
    subtitle: "缩进表示块",
    analogyTitle: "阶梯",
    analogyBody: "缩进像阶梯：同一层级的代码要对齐，表示\"这是一块\"。Python 用缩进区分代码块。",
    concepts: [
      { term: "缩进", desc: "同一块代码前加空格、保持一致" },
      { term: "代码块", desc: "缩进在一起的一组代码，同属一个块" }
    ],
    examples: [
      { title: "缩进块", code: "if True:\n    print(\"在块里\")\nprint(\"在块外\")", output: "在块里\n在块外" }
    ],
    task: "皮皮在门口设了道咒语闸门：条件成立才放行。写一个 if，条件你自己定，但必须成立；成立时缩进输出「在块里」，然后另起一行、不缩进（也就是在 if 外面）输出「在块外」。屏幕上先出现「在块里」，再出现「在块外」。",
    requireCode: "if\\s+[^:\\n]*:",
    requireMsg: "if 后面的代码要缩进（4 空格），块外的代码不缩进。",
    initialCode: "# 在这里写代码\n",
    answer: "if True:\n    print(\"在块里\")\nprint(\"在块外\")",
    expected: "在块里\n在块外",
    hints: ["思路：if 后缩进的代码属于这个块", "细节：缩进用 4 个空格，同一层对齐", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "条件 5 > 3 成立时，缩进着输出：成立", initialCode: "# 写代码\n", expected: "成立", answer: "if 5 > 3:\n    print(\"成立\")", hint: "条件那一行末尾别忘了冒号，下面那行往里缩进，才算作条件成立时执行的代码块。", requireCode: "if\\s+[^:\\n]*:", requireMsg: "if 成立时缩进打印。" },
      { tier: "巩固", task: "已知 x = 10。如果 x > 5 就缩进着输出「大」，然后在 if 外面（不缩进）输出「结束」。", initialCode: "x = 10\n# 写代码\n", expected: "大\n结束", answer: "if x > 5:\n    print(\"大\")\nprint(\"结束\")", hint: "缩进的那句属于条件成立才执行，「结束」要顶格写、不缩进，两者位置不同含义也不同。", requireCode: "if\\s+[^:\\n]*:", requireMsg: "if 内缩进打印\"大\"，块外打印\"结束\"。" },
      { tier: "挑战", task: "n = 6。如果 n 是偶数（n % 2 == 0）就缩进打印「偶数」；然后不管结果如何，都打印 n 乘 n 的结果", initialCode: "n = 6\n# 写代码\n", expected: "偶数\n36", answer: "if n % 2 == 0:\n    print(\"偶数\")\nprint(n * n)", hint: "看偶数就判断除以 2 的余数是不是 0，冒号后缩进处理；平方那句不缩进，写在条件块外面。", requireCode: "if\\s+[^:\\n]*:", requireMsg: "if 里的代码要缩进；print(n * n) 在 if 外面，不缩进。" }
    ]
  },
  {
    id: "l0-8",
    eyebrow: "第 11 关 · 自我介绍",
    title: "做一个会自我介绍的机器人",
    subtitle: "综合运用",
    analogyTitle: "拼一个自我介绍",
    analogyBody: "把变量、文字、数字拼起来，让皮皮会向新朋友介绍自己。",
    concepts: [
      { term: "综合", desc: "把变量、字符串、类型转换合成一段代码" }
    ],
    examples: [
      { title: "自我介绍", code: "name = \"小明\"\nage = 18\nprint(\"我是\" + name + \"，今年\" + str(age) + \"岁\")", output: "我是小明，今年18岁" }
    ],
    task: "皮皮要去参加新朋友见面会。用两个变量分别存下名字（小明）和年龄（18），拼出一行自我介绍：我是小明，今年18岁",
    initialCode: "# 在这里写代码\n",
    answer: "name = \"小明\"\nage = 18\nprint(\"我是\" + name + \"，今年\" + str(age) + \"岁\")",
    expected: "我是小明，今年18岁",
    hints: ["思路：先存名字和年龄，再拼接打印", "细节：数字 age 拼接前要 str()", "答案：\\nname = \"小明\"\\nage = 18\\nprint(\"我是\" + name + \"，今年\" + str(age) + \"岁\")"],
    exercises: [
      { tier: "热身", task: "用变量存\"小红\"并打印", initialCode: "# 写代码\n", expected: "小红", answer: "name = \"小红\"\\nprint(name)", hint: "一个变量存名字，再把变量名输出，两步就够了。" },
      { tier: "巩固", task: "用变量存城市和年龄，打印\"我在XX，今年XX岁\"", initialCode: "# 写代码\n", expected: "我在北京，今年20岁", answer: "city=\"北京\"; age=20; print(\"我在\"+city+\"，今年\"+str(age)+\"岁\")", hint: "城市可以直接拼进句子里，年龄是数字，得先用 str() 变成文字才能接上前后的文字。" },
      { tier: "挑战", task: "用变量存名字、年龄、身高（小数），输出一行自我介绍：我是小明，今年18岁，身高1.75米", initialCode: "# 写代码\n", expected: "我是小明，今年18岁，身高1.75米", answer: "name = \"小明\"\nage = 18\nheight = 1.75\nprint(\"我是\" + name + \"，今年\" + str(age) + \"岁，身高\" + str(height) + \"米\")", hint: "三个变量各存一项，拼接时两个数字都要先用 str() 转成文字，前后顺序照着句子来。", requireCode: "str\\s*\\(", requireMsg: "数字要先 str() 转成文字，才能和文字拼接。" }
    ]
  },
  {
    id: "l1-1",
    eyebrow: "第 9 关 · 键盘输入",
    title: "让程序听你说话：input()",
    subtitle: "输入与类型转换",
    analogyTitle: "对话窗口",
    analogyBody: "input() 像电脑问你一个问题、等你回答。它拿到的都是文字（字符串），要算数就得先用 int() 转成整数。",
    concepts: [
      { term: "input()", desc: "读取用户输入，返回字符串" },
      { term: "int()", desc: "把字符串转成整数" }
    ],
    examples: [
      { title: "读入并原样输出", code: "num = input(\"请输入一个数\")\nprint(num)", output: "（自动输入）" }
    ],
    task: "水晶球会报给你一个数，你要把它当成真正的数字，加上 3 后把结果报出来。（点「运行」会自动替你输入 5）",
    inputs: ["5"],
    requireCode: "int\\s*\\(\\s*input",
    requireMsg: "题目要求用 input() 读入，再用 int() 转成整数。请写 int(input(...))。",
    initialCode: "# 在这里写代码\n",
    answer: "num = int(input(\"请输入一个数\"))\nprint(num + 3)",
    expected: "8",
    hints: ["思路：input() 读到的是文字，要 int() 转", "细节：int(input(...)) 一层套一层", "答案：num = int(input(...)); print(num+3)"],
    exercises: [
      { tier: "热身", task: "用 input() 读入\"10\"，转整数，输出这个数加 2", initialCode: "# 写代码\n", inputs: ["10"], expected: "12", answer: "n = int(input(\"数\")); print(n + 2)", hint: "input() 读到的都是文字，先套 int() 变成整数存进变量，再加 2 输出。", requireCode: "int\\s*\\(\\s*input", requireMsg: "请用 int(input(...)) 读入并转换。" },
      { tier: "巩固", task: "用 input() 读入\"4\"，输出这个数的平方", initialCode: "# 写代码\n", inputs: ["4"], expected: "16", answer: "n = int(input(\"数\")); print(n * n)", hint: "先用 int() 转成整数再算，平方就是让这个数自己乘自己，别漏了转换。", requireCode: "int\\s*\\(\\s*input", requireMsg: "请用 int(input(...))，再计算 n*n。" },
      { tier: "挑战", task: "用 input() 先后读入两个数\"7\"和\"3\"，输出它们的和与积（分两行）", initialCode: "# 写代码\n", inputs: ["7", "3"], expected: "10\n21", answer: "a = int(input(\"a\"))\nb = int(input(\"b\"))\nprint(a + b)\nprint(a * b)", hint: "两次读入都要把 int() 套在 input() 外面，分别存进两个变量，先输出和再输出积。", requireCode: "int\\s*\\(\\s*input", requireMsg: "用两个 int(input(...)) 读入，先输出 a+b 再输出 a*b。" }
    ]
  },
  {
    id: "l1-2",
    eyebrow: "第 10 关 · 两个数求和",
    title: "输入两个数，求和",
    subtitle: "input + int 综合",
    analogyTitle: "收银机",
    analogyBody: "像收银机：先后输入两样商品价格，加起来算出总数。input 读两次、int 转整数、再相加。",
    concepts: [
      { term: "input()", desc: "读入用户输入（文字）" },
      { term: "int()", desc: "转成整数才能算数" },
      { term: "变量", desc: "存住读到的值" }
    ],
    examples: [
      { title: "两个数相加", code: "a = int(input(\"第一个数\"))\nb = int(input(\"第二个数\"))\nprint(a + b)", output: "（自动输入）" }
    ],
    task: "两位冒险者先后各报一个数，请把这两个数加起来，输出它们的总和。（点「运行」会自动替你输入 12 和 30）",
    inputs: ["12", "30"],
    requireCode: "int\\s*\\(\\s*input",
    requireMsg: "题目要求用 input() 读入两个数，再 int() 转成整数相加。",
    initialCode: "# 在这里写代码\n",
    answer: "a = int(input(\"第一个数\"))\nb = int(input(\"第二个数\"))\nprint(a + b)",
    expected: "42",
    hints: ["思路：输入两次、转两次、加一次", "细节：像示例那样，两个 input 分别存进变量", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 input() 读入\"7\"和\"8\"，输出它们的和", initialCode: "# 写代码\n", inputs: ["7", "8"], expected: "15", answer: "a=int(input(\"a\")); b=int(input(\"b\")); print(a+b)", hint: "两个数要分两次读入，每次都先用 int() 转换，再存进各自的变量相加。", requireCode: "int\\s*\\(\\s*input", requireMsg: "请用两个 int(input(...)) 读入并相加。" },
      { tier: "巩固", task: "用 input() 读入三个数\"12\"、\"15\"、\"18\"，输出它们的平均数（整除）", initialCode: "# 写代码\n", inputs: ["12", "15", "18"], expected: "15", answer: "a=int(input(\"a\")); b=int(input(\"b\")); c=int(input(\"c\")); print((a+b+c)//3)", hint: "三个数分别读入并转成整数，加总后用整除符号 // 除以 3，别用普通除号。", requireCode: "int\\s*\\(\\s*input", requireMsg: "读入三个数，(a+b+c)//3 求平均。" },
      { tier: "挑战", task: "用 input() 读入\"9\"和\"4\"，输出它们的差和积（分两行）", initialCode: "# 写代码\n", inputs: ["9", "4"], expected: "5\n36", answer: "a=int(input(\"a\")); b=int(input(\"b\")); print(a-b); print(a*b)", hint: "同样是两次读入转成整数存进两个变量，先算差输出，再算积输出到下一行。", requireCode: "int\\s*\\(\\s*input", requireMsg: "读入两数，先输出 a-b 再输出 a*b。" }
    ]
  },
  {
    id: "l1-3",
    eyebrow: "第 11 关 · 学会做判断",
    title: "比较运算与真/假",
    subtitle: ">、<、== 与布尔值",
    analogyTitle: "判断题",
    analogyBody: "比较像做判断题：\"3 比 2 大吗？\"答案只有对(True)或错(False)。比较的结果就是\"布尔值\"。",
    concepts: [
      { term: "> < == !=", desc: "大于、小于、等于、不等于" },
      { term: "True / False", desc: "布尔值：真 / 假" }
    ],
    examples: [
      { title: "比较", code: "print(3 > 2)\nprint(5 == 5)", output: "True\nTrue" }
    ],
    task: "判定符文：5 号符文比 3 号符文大吗？让 Python 比较这两个数，并输出判断结果（True 或 False）。",
    requireCode: "5\\s*[<>]\\s*3|3\\s*[<>]\\s*5",
    requireMsg: "题目要求比较的是 5 和 3（5 > 3）。你的代码比较的是别的数，请改为比较 5 和 3。",
    initialCode: "# 在这里写代码\n",
    answer: "print(5 > 3)",
    expected: "True",
    hints: ["思路：用 print 输出比较结果", "细节：比较运算符 5 > 3", "答案：print(5 > 3)"],
    exercises: [
      { tier: "热身", task: "输出 7 是否等于 7 的结果", initialCode: "# 写代码\n", expected: "True", answer: "print(7 == 7)", hint: "判断相等用两个等号的 ==，把题目里的两个数比一比，结果本身就是布尔值，直接输出它。", requireCode: "7\\s*==\\s*7", requireMsg: "题目要求判断 7 是否等于 7，请用 7 == 7 来比较。" },
      { tier: "巩固", task: "输出 3 * 4 是否等于 12 的结果", initialCode: "# 写代码\n", expected: "True", answer: "print(3 * 4 == 12)", hint: "把乘法先算出来，再拿它的结果和另一个数用 == 比较；Python 会先算乘除后算比较。", requireCode: "3\\s*\\*\\s*4\\s*==\\s*12", requireMsg: "先算 3*4 再和 12 比较，用 3 * 4 == 12。" },
      { tier: "挑战", task: "输出 17//5 是否等于 3 且 17%5 是否等于 2（两个都成立）的结果", initialCode: "# 写代码\n", expected: "True", answer: "print(17 // 5 == 3 and 17 % 5 == 2)", hint: "两个判断要同时成立，用 and 把两次比较连起来，注意 // 和 % 各自算完再比。", requireCode: "17\\s*//\\s*5\\s*==\\s*3\\s*and\\s*17\\s*%\\s*5\\s*==\\s*2", requireMsg: "17//5==3 且 17%5==2，用 and 连接。" }
    ]
  },
  {
    id: "l1-4",
    eyebrow: "第 12 关 · 路口的红绿灯",
    title: "让程序做选择",
    subtitle: "if / else",
    analogyTitle: "红绿灯",
    analogyBody: "if 像路口红绿灯：条件成立走这条路，否则走另一条。age >= 18 成立就\"可以进\"，否则\"不能进\"。",
    concepts: [
      { term: "if 条件:", desc: "成立才执行缩进的代码" },
      { term: "else:", desc: "否则执行另一段" }
    ],
    examples: [
      { title: "判断成年", code: "age = 18\nif age >= 18:\n    print(\"可以进\")\nelse:\n    print(\"不能进\")", output: "可以进" }
    ],
    task: "城门守卫要查年龄：先把年龄设为 18（成年线也是 18），再用 if/else 判断——满 18 岁输出「可以进」，否则输出「不能进」。",
    initialCode: "# 在这里写代码\n",
    answer: "age = 18\nif age >= 18:\n    print(\"可以进\")\nelse:\n    print(\"不能进\")",
    expected: "可以进",
    hints: ["思路：先存 age，再用 if 判断", "细节：if 后要缩进", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "n = 5，判断是否大于 0，输出\"正\"或\"非正\"", initialCode: "n = 5\n# 写代码\n", expected: "正", answer: "if n > 0: print(\"正\") else: print(\"非正\")", hint: "变量已经给好了，用 if 判断它是否大于 0，两个分支各写一段，别忘了行尾冒号和缩进。", requireCode: "if\\s+[^:\\n]*[<>!]=?", requireMsg: "用 if/else 判断 n 是否大于 0。" },
      { tier: "巩固", task: "x = 21，判断能否被 3 整除，输出\"整​除\"或\"不整除\"", initialCode: "x = 21\n# 写代码\n", expected: "整除", answer: "if x % 3 == 0: print(\"整除\") else: print(\"不整除\")", hint: "能不能整除看余数是不是 0，所以先算 % 再拿结果和 0 比较，if 配 else 走两条路。", requireCode: "if\\s+[^:\\n]*[<>!]=?", requireMsg: "用 if x%3==0 判断整除。" },
      { tier: "挑战", task: "n = 15，若是 3 和 5 的公倍数输出\"两者都是\"、是 3 或 5 的倍数输出\"其中一个\"、否则输出\"都不是\"", initialCode: "n = 15\n# 写代码\n", expected: "两者都是", answer: "if n % 3 == 0 and n % 5 == 0:\n    print(\"两者都是\")\nelif n % 3 == 0 or n % 5 == 0:\n    print(\"其中一个\")\nelse:\n    print(\"都不是\")", hint: "先用 and 判断能否同时被 3 和 5 整除，中间情况用 elif 加 or，最后 else 兜底。", requireCode: "if\\s+[^:\\n]*[<>!]=?|and|or", requireMsg: "用 if/elif/else 结合 % 判断 3 和 5 的倍数。" }
    ]
  },
  {
    id: "l1-5",
    eyebrow: "第 13 关 · 且、或、非",
    title: "逻辑运算：and / or / not",
    subtitle: "组合多个判断",
    analogyTitle: "盖章与门禁",
    analogyBody: "and 像两个条件都满足才放行（必须同时盖章）；or 像满足一个就放行；not 像反过来。",
    concepts: [
      { term: "and", desc: "两边都为真才为真" },
      { term: "or", desc: "一边为真就为真" },
      { term: "not", desc: "取反：真变假，假变真" }
    ],
    examples: [
      { title: "逻辑运算", code: "print(True and False)\nprint(True or False)\nprint(not True)", output: "False\nTrue\nFalse" }
    ],
    task: "符文组合谜题，谜面是：True and False。让 Python 算一算这个逻辑运算的结果并输出（True 还是 False？）。",
    requireCode: "True\\s*and\\s*False",
    requireMsg: "题目要求计算 True and False，请用 True and False 来运算。",
    initialCode: "# 在这里写代码\n",
    answer: "print(True and False)",
    expected: "False",
    hints: ["思路：and 两边都真才为真", "细节：True/False 首字母要大写", "答案：print(True and False)"],
    exercises: [
      { tier: "热身", task: "输出 True or False 的结果", initialCode: "# 写代码\n", expected: "True", answer: "print(True or False)", hint: "or 只要有一边为真结果就为真；把题目里的两个布尔值直接拿去运算，别加引号变成文字。", requireCode: "True\\s*or\\s*False", requireMsg: "题目要求计算 True or False，请用 True or False。" },
      { tier: "巩固", task: "输出 15 是否在 10 到 20 之间（含边界）的结果", initialCode: "# 写代码\n", expected: "True", answer: "print(15 >= 10 and 15 <= 20)", hint: "判断一个数在区间内要拆成两个比较，两边都成立才为真，用 and 连，含边界用 >= 和 <=。", requireCode: "15\\s*>=\\s*10\\s*and\\s*15\\s*<=\\s*20", requireMsg: "用 and 组合判断 15 是否在 10~20 之间：15 >= 10 and 15 <= 20。" },
      { tier: "挑战", task: "输出 2024 是否为闰年的结果（能被4整除且不能100整除，或能被400整除）", initialCode: "# 写代码\n", expected: "True", answer: "print(2024 % 4 == 0 and 2024 % 100 != 0 or 2024 % 400 == 0)", hint: "闰年判断分两段：前两个条件用 and 连，整体再用 or 接第三个条件，注意 and 优先于 or。", requireCode: "2024\\s*%\\s*4\\s*==\\s*0\\s*and", requireMsg: "用闰年规则：2024%4==0 and 2024%100!=0 or 2024%400==0。" }
    ]
  },
  {
    id: "l1-6",
    eyebrow: "第 14 关 · 多重路口",
    title: "多重分支：if / elif / else",
    subtitle: "多个选择",
    analogyTitle: "多岔路口",
    analogyBody: "生活常不止两条路。if/elif/else 像多岔路口：从上往下依次判断，命中哪个走哪条。",
    concepts: [
      { term: "if", desc: "第一个条件" },
      { term: "elif", desc: "否则如果（else if）" },
      { term: "else", desc: "兜底（都不满足时）" }
    ],
    examples: [
      { title: "成绩分级", code: "score = 85\nif score >= 90:\n    print(\"优秀\")\nelif score >= 75:\n    print(\"良好\")\nelif score >= 60:\n    print(\"及格\")\nelse:\n    print(\"不及格\")", output: "良好" }
    ],
    task: "学堂按成绩分等级：≥90 优秀、≥75 良好、≥60 及格、其余不及格。已知 score = 85，用 if/elif/else 判断它属于哪一级，只输出那一级。",
    requireCode: "if\\s+[^:\\n]*[<>!]=?",
    requireMsg: "要用 if/elif/else 分级。变量名和比较写法随意，只要逻辑对、能输出\"良好\"即可。",
    initialCode: "score = 85\n# 在这里写代码\n",
    answer: "score = 85\nif score >= 90:\n    print(\"优秀\")\nelif score >= 75:\n    print(\"良好\")\nelif score >= 60:\n    print(\"及格\")\nelse:\n    print(\"不及格\")",
    expected: "良好",
    hints: ["思路：从上往下排，先判高分", "细节：elif 是 else if 的简写", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "age=20，≥18 输出\"成年\"否则\"未成年\"", initialCode: "age = 20\n# 写代码\n", expected: "成年", answer: "if age >= 18: print(\"成年\") else: print(\"未成年\")", hint: "变量已经给好了，只需用 if 判断它是否达到 18，行尾冒号加缩进，else 处理另一路。", requireCode: "if\\s+[^:\\n]*[<>!]=?", requireMsg: "判断是否成年，用 if/else 判断年龄是否达到 18 即可（变量名可自选）。" },
      { tier: "巩固", task: "month=4，判断所属季节：3~5 春、6~8 夏、9~11 秋、12/1/2 冬，输出\"春\"", initialCode: "month = 4\n# 写代码\n", expected: "春", answer: "if 3 <= month <= 5: print(\"春\") elif 6 <= month <= 8: print(\"夏\") elif 9 <= month <= 11: print(\"秋\") else: print(\"冬\")", hint: "月份是一个连续区间，用链式比较写最清楚：从 3~5 那段开始逐段 elif，最后 else 留给冬天。", requireCode: "if\\s+[^:\\n]*[<>!]=?", requireMsg: "按月份判断季节：3~5春、6~8夏、9~11秋、其余冬。" },
      { tier: "挑战", task: "a=3,b=4,c=5，判断能否构成三角形并输出\"能构成\"（两边之和大于第三边）", initialCode: "a = 3\nb = 4\nc = 5\n# 写代码\n", expected: "能构成", answer: "if a + b > c and a + c > b and b + c > a: print(\"能构成\") else: print(\"不能构成\")", hint: "三组两边之和都要大于第三边，三个条件缺一不可，用 and 串起来放进同一个 if。", requireCode: "if\\s+[^:\\n]*[<>!]=?", requireMsg: "判断三角形：a+b>c 且 a+c>b 且 b+c>a 才成立。" }
    ]
  },
  {
    id: "l1-7",
    eyebrow: "第 15 关 · 重复的小机器人",
    title: "用 for 循环重复做",
    subtitle: "for i in range()",
    analogyTitle: "机器人重复做事",
    analogyBody: "for 像一台小机器人，把一件事重复做固定次数。for i in range(5) 就是重复 5 次，i 依次取 0、1、2、3、4。",
    concepts: [
      { term: "for i in range(n):", desc: "重复 n 次，i 从 0 到 n-1" },
      { term: "缩进", desc: "循环里的代码要缩进" }
    ],
    examples: [
      { title: "打印 0~2", code: "for i in range(3):\n    print(i)", output: "0\n1\n2" }
    ],
    task: "皮皮要清点 1 到 5 号宝箱。用 for 循环把 1、2、3、4、5 依次输出，每个数字占一行。",
    initialCode: "# 在这里写代码\n",
    answer: "for i in range(1, 6):\n    print(i)",
    expected: "1\n2\n3\n4\n5",
    hints: ["思路：range(1,6) 生成 1~5", "细节：循环体要缩进", "答案：for i in range(1,6): print(i)"],
    exercises: [
      { tier: "热身", task: "用 for 打印 1 到 5", initialCode: "# 写代码\n", expected: "1\n2\n3\n4\n5", answer: "for i in range(1,6): print(i)", hint: "range() 的第二个数取不到，起点写 1、终点要写到 5 的后面一位；循环体记得缩进。", requireCode: "for\\s+.*\\s+in\\s+range", requireMsg: "用 for i in range(1,6) 遍历打印。" },
      { tier: "巩固", task: "用 for 在 1 到 20 范围内，打印所有能被 4 整除的数", initialCode: "# 写代码\n", expected: "4\n8\n12\n16\n20", answer: "for i in range(1,21):\n    if i % 4 == 0:\n        print(i)", hint: "范围要含 20 所以 range() 的终点往后多写一位；循环体里先 if 判断能否被 4 整除，成立才输出。", requireCode: "for\\s+.*\\s+in\\s+range[^\\n]*:\\s*\\n\\s*if|if\\s+.*%", requireMsg: "循环里用 if i%4==0 判断整除再打印。" },
      { tier: "挑战", task: "用 for 求 1 到 100 中所有能被 7 整除的数之和，输出结果", initialCode: "s = 0\n# 写代码\n", expected: "735", answer: "for i in range(1,101):\n    if i % 7 == 0:\n        s = s + i\nprint(s)", hint: "累加变量要放在循环外面并初始化为 0；循环里用 % 判断能否被 7 整除，成立才往上加，结束后输出总和。", requireCode: "for\\s+.*\\s+in\\s+range", requireMsg: "循环里用 if i%7==0 累加进 s，最后 print(s)。" }
    ]
  },
  {
    id: "l1-8",
    eyebrow: "第 16 关 · 没到站就一直走",
    title: "用 while 循环",
    subtitle: "while 条件",
    analogyTitle: "还没到站就继续走",
    analogyBody: "while 像\"还没到站就继续往前走\"——只要条件成立就一直做，注意要在循环里改变条件，否则会死循环。",
    concepts: [
      { term: "while 条件:", desc: "条件成立就循环" },
      { term: "死循环", desc: "忘了改条件会一直跑不停" }
    ],
    examples: [
      { title: "打印 1~3", code: "n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1", output: "1\n2\n3" }
    ],
    task: "楼梯有 3 级，皮皮要一级一级往上跳。用 while 循环把 1、2、3 依次输出，每个数字占一行。",
    initialCode: "# 在这里写代码\n",
    answer: "n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1",
    expected: "1\n2\n3",
    hints: ["思路：从 1 开始，每次 +1", "细节：循环里要更新 n", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 while 打印 1 到 5", initialCode: "# 写代码\n", expected: "1\n2\n3\n4\n5", answer: "n=1; while n<=5: print(n); n=n+1", hint: "先把计数器设成 1，while 的条件写成不超过 5，循环体里输出后必须让计数器加 1，忘了就死循环。", requireCode: "while\\s+.*\\s*[<>!]=?", requireMsg: "用 while 加循环条件，循环里更新 n。" },
      { tier: "巩固", task: "用 while 从 10 倒数到 1（隔一个，即 10,8,6,4,2）", initialCode: "n = 10\n# 写代码\n", expected: "10\n8\n6\n4\n2", answer: "while n >= 2:\n    print(n)\n    n = n - 2", hint: "计数器从 10 起步，循环条件写成大于等于 2；每轮输出后让计数器减 2，注意最后一次的值。", requireCode: "while\\s+.*\\s*[<>!]=?", requireMsg: "用 while 遍历，每次 n 减 2 直到不满足条件。" },
      { tier: "挑战", task: "用 while 求 1 到 100 中所有偶数的和，输出结果", initialCode: "s = 0\nn = 2\n# 写代码\n", expected: "2550", answer: "while n <= 100:\n    s = s + n\n    n = n + 2\nprint(s)", hint: "累加变量先初始化为 0，计数从 2 开始每次加 2 保证都是偶数，循环结束后输出这个和。", requireCode: "while\\s+.*\\s*[<>!]=?", requireMsg: "用 while 累加偶数（n 每次 +2）再 print(s)。" }
    ]
  },
  {
    id: "l1-9",
    eyebrow: "刹车与跳过",
    title: "循环里的 break / continue",
    subtitle: "break 停止 / continue 跳过",
    analogyTitle: "刹车与跳过",
    analogyBody: "break 像刹车，遇到就整圈停；continue 像跳过这一个，继续下一圈。",
    concepts: [
      { term: "break", desc: "立即结束整个循环" },
      { term: "continue", desc: "跳过本次，继续下一次" }
    ],
    examples: [
      { title: "break 停", code: "for i in range(1, 6):\n    if i == 3:\n        break\n    print(i)", output: "1\n2" }
    ],
    task: "通往宝藏的路上有 5 格，第 3 格是陷阱，踩到就得停下。用 for 循环输出 1 到 5，遇到 3 时用 break 结束循环（结果只会留下 1 和 2）。",
    requireCode: "break",
    requireMsg: "题目要求用 break 停止循环，请写 if i==3: break。",
    initialCode: "# 在这里写代码\n",
    answer: "for i in range(1, 6):\n    if i == 3:\n        break\n    print(i)",
    expected: "1\n2",
    hints: ["思路：break 立即退出循环", "细节：i==3 时 break", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 for 打印 1 到 5，跳过 3（用 continue），输出 1,2,4,5", initialCode: "# 写代码\n", expected: "1\n2\n4\n5", answer: "for i in range(1,6):\n    if i == 3:\n        continue\n    print(i)", hint: "循环照常从 1 走到 5，遇到 3 先用 if 判断，命中就 continue 跳过本轮，别让它走到输出。", requireCode: "continue", requireMsg: "用 continue 跳过 3。" },
      { tier: "巩固", task: "用 for 打印 1 到 10，遇到 6 用 break 停，输出 1~5", initialCode: "# 写代码\n", expected: "1\n2\n3\n4\n5", answer: "for i in range(1,11):\n    if i == 6:\n        break\n    print(i)", hint: "从 1 开始循环，数到 6 时用 break 直接结束整个循环，6 和后面的数都不会被输出。", requireCode: "break", requireMsg: "i==6 时 break。" },
      { tier: "挑战", task: "用 for 打印 1 到 10 里的偶数（跳过奇数用 continue），输出 2,4,6,8,10", initialCode: "# 写代码\n", expected: "2\n4\n6\n8\n10", answer: "for i in range(1,11):\n    if i % 2 != 0:\n        continue\n    print(i)", hint: "判断的是奇数而不是偶数：奇数就 continue 跳过，剩下自然都是偶数，再统一输出，别写反。", requireCode: "continue", requireMsg: "奇数用 continue 跳过，只打印偶数。" }
    ]
  },
  {
    id: "l1-10",
    eyebrow: "循环套循环",
    title: "嵌套循环",
    subtitle: "循环里再放循环",
    analogyTitle: "表格里的格子",
    analogyBody: "嵌套循环像一张表格：外层循环管\"行\"，内层循环管\"列\"，一行一行地填格子。",
    concepts: [
      { term: "嵌套循环", desc: "一个循环里再套一个循环" },
      { term: "外层/内层", desc: "外层管行，内层管列" }
    ],
    examples: [
      { title: "行列", code: "for i in range(2):\n    for j in range(3):\n        print(i * j)", output: "0\n0\n0\n0\n1\n2" }
    ],
    task: "盖章要盖两层：外层 2 次（编号 0、1），内层 3 次（编号 0、1、2）。用嵌套 for 把「外层编号 × 内层编号」的结果逐个输出（共 6 行）。",
    requireCode: "for\\s+.*\\s+in\\s+[^\\n]*\\n\\s*for\\s+.*\\s+in|for.*for",
    requireMsg: "题目要求嵌套循环（一个 for 里再套 for）。",
    initialCode: "# 在这里写代码\n",
    answer: "for i in range(2):\n    for j in range(3):\n        print(i * j)",
    expected: "0\n0\n0\n0\n1\n2",
    hints: ["思路：外层循环里再写一个循环", "细节：内层循环整体放在外层循环体内（缩进）", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用嵌套 for 累计 i 从1到2、j从1到3 的所有 i*j 之和并输出", initialCode: "s = 0\n# 写代码\n", expected: "18", answer: "for i in range(1,3):\n    for j in range(1,4):\n        s = s + i * j\nprint(s)", hint: "两个循环一层套一层，外层管 i、内层管 j；累加变量放最外面初始化为 0，每个组合把乘积加上去。", requireCode: "for.*for", requireMsg: "嵌套循环累加 i*j。" },
      { tier: "巩固", task: "用嵌套 for 打印外层 1~2、内层 1~3 的所有组合 j，如 1 1 1 2 2 2，每行一组", initialCode: "# 写代码\n", expected: "111\n222", answer: "for i in range(1,3):\n    line = \"\"\n    for j in range(1,4):\n        line = line + str(i)\n    print(line)", hint: "外层每换一个数就要重新准备一个空文字，内层把同一个字符拼三次，回到外层再整行输出。", requireCode: "for.*for", requireMsg: "外层循环每行内层的数。" },
      { tier: "挑战", task: "用嵌套 for 统计外层 1~2、内层 1~4 中，内层 j 能被外层 i 整除的次数并输出", initialCode: "c = 0\n# 写代码\n", expected: "6", answer: "for i in range(1,3):\n    for j in range(1,5):\n        if j % i == 0:\n            c = c + 1\nprint(c)", hint: "双层循环里用 % 判断内层数能否被外层数整除，成立就让计数器加 1；计数器在循环之前先准备好。", requireCode: "for.*for", requireMsg: "嵌套循环里 if j%i==0 计数。" }
    ]
  },
  {
    id: "l2-1",
    eyebrow: "第 17 关 · 文字的魔法",
    title: "字符串方法",
    subtitle: "upper / lower / strip / replace / len",
    analogyTitle: "文字美容院",
    analogyBody: "字符串像一段文字，.upper() 是把它变成大写、.strip() 去掉两边空格、len() 数它有几位——就像给文字做美容和量长度。",
    concepts: [
      { term: ".upper()", desc: "转大写" },
      { term: ".lower()", desc: "转小写" },
      { term: ".strip()", desc: "去掉首尾空格" },
      { term: "len()", desc: "数长度" }
    ],
    examples: [
      { title: "大写与长度", code: "name = \"hello\"\nprint(name.upper())\nprint(len(name))", output: "HELLO\n5" }
    ],
    task: "门口的告示牌字太小了：name = \"hello\"。请把它改成全大写再输出（用字符串的 .upper() 方法）。",
    requireCode: "\\.upper\\s*\\(\\)",
    requireMsg: "题目要求用字符串方法 .upper() 转大写，请写 name.upper()。",
    initialCode: "name = \"hello\"\n# 在这里写代码\n",
    answer: "name = \"hello\"\nprint(name.upper())",
    expected: "HELLO",
    hints: ["思路：对字符串调用方法，写成 变量.方法()", "细节：upper 要加括号 ()", "答案：print(name.upper())"],
    exercises: [
      { tier: "热身", task: "把\"  Hi  \"去掉两边空格后输出", initialCode: "s = \"  Hi  \"\n# 请写出 s 去掉空格的输出（用 .strip()）", expected: "Hi", answer: "print(s.strip())", hint: "字符串自带 .strip()，专门去掉首尾的空格；它返回新字符串，原串本身不变。", requireCode: "\\.strip\\s*\\(\\)", requireMsg: "题目要求用 .strip() 去掉首尾空格。" },
      { tier: "巩固", task: "把\"我爱你\"中的\"爱\"换成\"喜欢\"后输出", initialCode: "s = \"我爱你\"\n# 用 .replace() 替换并输出", expected: "我喜欢你", answer: "print(s.replace(\"爱\",\"喜欢\"))", hint: "替换字符用 .replace()，按顺序把旧字和新字传进去，它返回替换后的新字符串。", requireCode: "\\.replace\\s*\\(\\s*[\"']爱[\"']", requireMsg: "题目要求用 .replace(\"爱\",\"喜欢\")。" },
      { tier: "挑战", task: "把字符串\"  Python编程  \"去掉首尾空格并转成大写后输出（链式调用）", initialCode: "s = \"  Python编程  \"\n# 用 .strip().upper() 链式处理", expected: "PYTHON编程", answer: "print(s.strip().upper())", hint: "两个方法可以连着写：先 .strip() 去首尾空格，再在它的结果上继续 .upper()，顺序不能颠倒。", requireCode: "\\.strip\\s*\\(\\).*\\.upper|\\.upper\\s*\\(\\).*\\.strip", requireMsg: "用 s.strip().upper() 链式调用：先 stri 后 upper。" }
    ]
  },
  {
    id: "l2-2",
    eyebrow: "第 18 关 · 购物清单",
    title: "列表基础",
    subtitle: "创建、索引、长度",
    analogyTitle: "有顺序的购物清单",
    analogyBody: "列表像一张有顺序的购物清单，用 [ ] 框起来，从 0 开始编号；fruit[0] 是第 1 个、fruit[1] 是第 2 个。",
    concepts: [
      { term: "列表 [ ]", desc: "一串有序数据" },
      { term: "索引 [i]", desc: "从 0 开始取第 i 个" },
      { term: "len()", desc: "数列表长度" }
    ],
    examples: [
      { title: "创建与取值", code: "fruit = [\"苹果\", \"香蕉\", \"橘子\"]\nprint(fruit[1])", output: "香蕉" }
    ],
    task: "皮皮的购物清单是 fruit = [\"苹果\", \"香蕉\", \"橘子\"]。输出清单里第 2 样东西。（小提示：Python 从 0 开始数）",
    requireCode: "fruit\\s*\\[1\\]",
    requireMsg: "题目要求取列表第 2 个元素，请用 fruit[1]（索引从 0 开始）。",
    initialCode: "fruit = [\"苹果\", \"香蕉\", \"橘子\"]\n# 在这里写代码\n",
    answer: "fruit = [\"苹果\", \"香蕉\", \"橘子\"]\nprint(fruit[1])",
    expected: "香蕉",
    hints: ["思路：列表下标从 0 开始，第 1 个是 [0]", "细节：第 2 个是 [1]", "答案：print(fruit[1])"],
    exercises: [
      { tier: "热身", task: "取列表 [\"A\",\"B\",\"C\"] 的第 1 个元素并输出", initialCode: "li = [\"A\",\"B\",\"C\"]\n# 写代码\n", expected: "A", answer: "print(li[0])", hint: "下标从 0 开始数，所谓「第 1 个」元素对应的下标其实是 0，写在方括号里。", requireCode: "li\\s*\\[0\\]", requireMsg: "第 1 个元素下标是 0，用 li[0]。" },
      { tier: "巩固", task: "输出列表 [10,20,30] 的长度", initialCode: "li = [10,20,30]\n# 写代码\n", expected: "3", answer: "print(len(li))", hint: "数一串数据有几个用 len()，把整个列表放进括号里，得到的就是它的长度。", requireCode: "len\\s*\\(\\s*li", requireMsg: "用 len(li) 输出列表长度。" },
      { tier: "挑战", task: "列表 [10,20,30,40]，先输出它的长度，再输出最后一个元素（分两行）", initialCode: "li = [10,20,30,40]\n# 写代码\n", expected: "4\n40", answer: "print(len(li))\nprint(li[-1])", hint: "分两行做：一行用 len() 数长度，另一行用负下标 -1 取最后一个元素。", requireCode: "len\\s*\\(\\s*li\\s*\\)[^\\n]*\\n[^\\n]*li\\s*\\[-1\\]|li\\s*\\[-1\\]", requireMsg: "先 print(len(li)) 再 print(li[-1])。" }
    ]
  },
  {
    id: "l2-3",
    eyebrow: "第 19 关 · 修改清单",
    title: "列表操作",
    subtitle: "append / 增删改",
    analogyTitle: "往清单加东西",
    analogyBody: "append 像往购物清单末尾再加一件商品。列表可以改、可以加，很灵活。",
    concepts: [
      { term: ".append(x)", desc: "把 x 加到列表末尾" },
      { term: "索引赋值", desc: "li[i] = x 改某个" }
    ],
    examples: [
      { title: "加一个", code: "n = [1, 2, 3]\nn.append(4)\nprint(n)", output: "[1, 2, 3, 4]" }
    ],
    task: "篮子里已经有 n = [1, 2, 3] 三样东西。用 .append 再放进一个 4，然后输出篮子里东西的总数。",
    requireCode: "\\.append\\s*\\(\\s*4\\s*\\)",
    requireMsg: "题目要求用 .append(4) 往列表加元素，请写 n.append(4)。",
    initialCode: "n = [1, 2, 3]\n# 在这里写代码\n",
    answer: "n = [1, 2, 3]\nn.append(4)\nprint(len(n))",
    expected: "4",
    hints: ["思路：append 加元素，len 数长度", "细节：先 append 再 len", "答案：n.append(4); print(len(n))"],
    exercises: [
      { tier: "热身", task: "创建 [1,2]，把 3 追加后输出列表", initialCode: "n = [1,2]\n# 写代码\n", expected: "[1, 2, 3]", answer: "n.append(3); print(n)", hint: "往列表末尾加东西用 .append()，它直接改动原列表，不用重新赋值，加完再输出列表。", requireCode: "\\.append\\s*\\(\\s*3", requireMsg: "用 n.append(3) 追加，再 print(n)。" },
      { tier: "巩固", task: "创建 [5,6]，把 7 追加后输出长度", initialCode: "n = [5,6]\n# 写代码\n", expected: "3", answer: "n.append(7); print(len(n))", hint: "先用 .append() 把 7 加到末尾，列表就变长了，再用 len() 数它现在的长度。", requireCode: "\\.append\\s*\\(\\s*7", requireMsg: "用 n.append(7) 后输出 len(n)。" },
      { tier: "挑战", task: "列表 n=[1,2,3]，先把 4 追加，再把第 1 个元素改成 9，输出列表", initialCode: "n = [1,2,3]\n# 写代码\n", expected: "[1, 9, 3, 4]", answer: "n.append(4)\nn[1] = 9\nprint(n)", hint: "先 .append() 追加到末尾，再用方括号写下标 1 改那个位置——下标 1 是第 2 个元素，别改错。", requireCode: "\\.append[^\\n]*\\n[^\\n]*n\\s*\\[\\s*1\\s*\\]\\s*=|n\\s*\\[\\s*1\\s*\\]", requireMsg: "先 n.append(4)，再 n[1]=9，最后 print(n)。" }
    ]
  },
  {
    id: "l2-4",
    eyebrow: "第 20 关 · 通讯录",
    title: "字典：名字→值",
    subtitle: "dict 键值对",
    analogyTitle: "通讯录",
    analogyBody: "字典像通讯录：一个名字(键)对应一个号码(值)。d[\"小明\"] 就能找到小明的信息。",
    concepts: [
      { term: "字典 { }", desc: "键:值 对应表" },
      { term: "d[键]", desc: "按键取值" }
    ],
    examples: [
      { title: "取年龄", code: "d = {\"小明\": 18}\nprint(d[\"小明\"])", output: "18" }
    ],
    task: "皮皮的通讯录是 d = {\"小明\": 18}。按名字取出小明的年龄并输出。",
    requireCode: "d\\s*\\[\\s*[\"']小明[\"']\\s*\\]",
    requireMsg: "题目要求用字典按键取值，请写 d[\"小明\"]。",
    initialCode: "d = {\"小明\": 18}\n# 在这里写代码\n",
    answer: "d = {\"小明\": 18}\nprint(d[\"小明\"])",
    expected: "18",
    hints: ["思路：键是\"小明\"，值是 18", "细节：用 d[键] 取值", "答案：print(d[\"小明\"])"],
    exercises: [
      { tier: "热身", task: "取字典 {\"苹果\":5} 里\"苹果\"的价格并输出", initialCode: "d = {\"苹果\":5}\n# 写代码\n", expected: "5", answer: "print(d[\"苹果\"])", hint: "字典不按下标取，而是用方括号包住键名，键名是什么就写什么，取到对应的值。", requireCode: "d\\s*\\[\\s*[\"']苹果[\"']", requireMsg: "用 d[\"苹果\"] 取值。" },
      { tier: "巩固", task: "字典 d={\"小明\":18,\"小红\":20}，先把\"小红\"的年龄改成 21，再输出 d[\"小红\"]", initialCode: "d = {\"小明\":18,\"小红\":20}\n# 写代码\n", expected: "21", answer: "d[\"小红\"] = 21\nprint(d[\"小红\"])", hint: "改字典的值不必找位置：方括号里写清键名，直接把新值给它，然后再输出这个键。", requireCode: "d\\s*\\[\\s*[\"']小红[\"']\\s*\\]\\s*=|d\\s*\\[\\s*[\"']小红[\"']", requireMsg: "先 d[\"小红\"]=21 改值，再输出。" },
      { tier: "挑战", task: "字典 d={\"a\":1}，再添加键 \"b\" 值为 2，输出整个字典", initialCode: "d = {\"a\":1}\n# 写代码\n", expected: "{'a': 1, 'b': 2}", answer: "d[\"b\"] = 2\nprint(d)", hint: "字典加新键和改值的写法一样，用一个原字典里没有的键名，它就会自动多出这一对。", requireCode: "d\\s*\\[\\s*[\"']b[\"']\\s*\\]", requireMsg: "用 d[\"b\"]=2 添加键，再 print(d)。" }
    ]
  },
  {
    id: "l2-5",
    eyebrow: "第 21 关 · 自己的菜谱",
    title: "自定义函数 def",
    subtitle: "def + 调用",
    analogyTitle: "菜谱",
    analogyBody: "def 像写一份菜谱：定好原料(参数)和做法，写一次就能反复调用。def add(a,b): 就是把 a 和 b 加起来。",
    concepts: [
      { term: "def 函数名(参数):", desc: "定义函数" },
      { term: "return", desc: "返回结果" },
      { term: "调用", desc: "函数名(实参) 使用它" }
    ],
    examples: [
      { title: "加法函数", code: "def add(a, b):\n    return a + b\nprint(add(3, 4))", output: "7" }
    ],
    task: "你要造一台随时能用的「加法机」，名字叫 add：给它两个数，它返回这两个数的和。然后让它算 3 加 4，把结果输出。",
    requireCode: "def\\s+add\\s*\\(",
    requireMsg: "题目要求定义函数 add，请写 def add(a, b): ... return ...。",
    initialCode: "# 在这里写代码\n",
    answer: "def add(a, b):\n    return a + b\nprint(add(3, 4))",
    expected: "7",
    hints: ["思路：def 定义，return 返回，函数名(参数) 调用", "细节：函数体要缩进", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 square(n) 返回 n 的平方，调用 square(5) 并输出", initialCode: "# 写代码\n", expected: "25", answer: "def square(n): return n*n; print(square(5))", hint: "分三块：用 def 声明函数并设好参数，函数体里用 return 交出结果，最后再调用一次。", requireCode: "def\\s+square", requireMsg: "请 def square(n) 返回 n*n，再调用。" },
      { tier: "巩固", task: "定义 sub(a,b) 返回两数之差，调用 sub(10,4) 并输出", initialCode: "# 写代码\n", expected: "6", answer: "def sub(a,b): return a-b; print(sub(10,4))", hint: "两个参数写在括号里用逗号隔开，函数体做减法后靠 return 送回结果，别在函数里直接输出。", requireCode: "def\\s+sub", requireMsg: "请 def sub(a,b) 返回 a-b，再调用。" },
      { tier: "挑战", task: "定义 mx(a,b) 返回两数中较大的那个（用 if/else 判断），调用 mx(3,9) 并输出", initialCode: "# 写代码\n", expected: "9", answer: "def mx(a,b):\n    if a > b:\n        return a\n    else:\n        return b\nprint(mx(3,9))", hint: "函数体里要分岔：用 if 和 else 比大小，谁大就 return 谁，两条分支都要有返回值。", requireCode: "def\\s+mx", requireMsg: "用 if/else 在函数里判断并 return 较大值。" }
    ]
  },
  {
    id: "l2-6",
    eyebrow: "第 22 关 · 逐个处理",
    title: "for 遍历列表",
    subtitle: "for x in 列表",
    analogyTitle: "翻清单",
    analogyBody: "for x in 列表: 像翻开一张清单，x 依次等于每个元素，逐个处理。",
    concepts: [
      { term: "for x in 列表:", desc: "逐个取出元素" },
      { term: "循环体", desc: "缩进，每个元素执行一次" }
    ],
    examples: [
      { title: "逐个打印", code: "for x in [1, 2, 3]:\n    print(x)", output: "1\n2\n3" }
    ],
    task: "一排 3 个宝箱：用 for 循环遍历列表 [1, 2, 3]，把里面的数字逐个输出，每个占一行。",
    requireCode: "for\\s+.*\\s+in\\s+\\[",
    requireMsg: "题目要求用 for x in 列表 遍历，请写 for x in [1,2,3]: print(x)。",
    initialCode: "# 在这里写代码\n",
    answer: "for x in [1, 2, 3]:\n    print(x)",
    expected: "1\n2\n3",
    hints: ["思路：for 元素 in 列表，缩进写 print", "细节：列表用 [ ]", "答案：for x in [1,2,3]: print(x)"],
    exercises: [
      { tier: "热身", task: "用 for 打印列表 [\"a\",\"b\"] 的每个元素", initialCode: "# 写代码\n", expected: "a\nb", answer: "for x in [\"a\",\"b\"]: print(x)", hint: "把列表交给 for 循环，循环变量一次接住一个元素，循环体记得缩进，会重复执行。", requireCode: "for\\s+.*\\s+in\\s+\\[", requireMsg: "请用 for x in 列表 遍历。" },
      { tier: "巩固", task: "用 for 求列表 [1,2,3,4] 的和并输出", initialCode: "s = 0\n# 写代码\n", expected: "10", answer: "for x in [1,2,3,4]:\n    s = s + x\nprint(s)", hint: "先准备一个从 0 开始的累加变量，循环里把它逐个加上去，循环结束再输出，别在循环里输出。", requireCode: "for\\s+.*\\s+in\\s+\\[", requireMsg: "遍历列表累加进 s，最后 print(s)。" },
      { tier: "挑战", task: "用 for 找出列表 [3,7,2] 里的最大值并输出（不用 max，用循环比较）", initialCode: "mx = 0\n# 写代码\n", expected: "7", answer: "for x in [3,7,2]:\n    if x > mx:\n        mx = x\nprint(mx)", hint: "先把第一个元素当作当前最大，之后每取一个就跟它比，更大就替换，循环完输出它。", requireCode: "for\\s+.*\\s+in\\s+\\[", requireMsg: "遍历时 if x>mx 就更新 mx，最后 print(mx)。" }
    ]
  },
  {
    id: "l2-7",
    eyebrow: "第 23 关 · 打不动的清单",
    title: "元组 tuple",
    subtitle: "不可变列表",
    analogyTitle: "胶水清单",
    analogyBody: "元组像用胶水固定住的购物清单：建好后就不能再改。用 ( ) 表示，里面的东西按顺序排。",
    concepts: [
      { term: "元组 ( )", desc: "建好后不可改" },
      { term: "索引", desc: "下标从 0 开始取值" }
    ],
    examples: [
      { title: "取值", code: "t = (1, 2, 3)\nprint(t[1])", output: "2" }
    ],
    task: "石板上刻着 t = (1, 2, 3)，它改不动。输出石板上第 2 个数字。",
    requireCode: "t\\s*\\[\\s*1\\s*\\]",
    requireMsg: "题目要求取元组第 2 个元素，请用 t[1]（下标从 0 开始）。",
    initialCode: "t = (1, 2, 3)\n# 在这里写代码\n",
    answer: "t = (1, 2, 3)\nprint(t[1])",
    expected: "2",
    hints: ["思路：元组下标从 0 开始，第 2 个是 [1]", "细节：元组用 ( )", "答案：print(t[1])"],
    exercises: [
      { tier: "热身", task: "取元组 (7,8,9) 的第 1 个元素并输出", initialCode: "t = (7,8,9)\n# 写代码\n", expected: "7", answer: "print(t[0])", hint: "元组取值和列表一样：方括号里写下标，第 1 个元素的下标是 0。", requireCode: "t\\s*\\[\\s*0\\s*\\]", requireMsg: "第 1 个元素下标是 0，用 t[0]。" },
      { tier: "巩固", task: "元组 t=(1,2,3,4)，输出它的长度和最后一个元素（分两行）", initialCode: "t = (1,2,3,4)\n# 写代码\n", expected: "4\n4", answer: "print(len(t))\nprint(t[-1])", hint: "两行两次输出：先用 len() 数元组长度，再用负下标 -1 拿最后一个。", requireCode: "len\\s*\\(\\s*t", requireMsg: "先 print(len(t)) 再 print(t[-1])。" },
      { tier: "挑战", task: "用元组交换两个变量 a=3、b=5，交换后输出 a 和 b（分两行）", initialCode: "a = 3\nb = 5\n# 用元组交换 a 和 b", expected: "5\n3", answer: "a, b = b, a\nprint(a)\nprint(b)", hint: "交换两个变量不用临时变量：用逗号把两个值一起打包再一起接收，顺序互相对调就行。", requireCode: "a\\s*,\\s*b\\s*=\\s*b\\s*,\\s*a|,\\s*=.*,", requireMsg: "用 a, b = b, a 交换。" }
    ]
  },
  {
    id: "l2-8",
    eyebrow: "第 24 关 · 文字里找东西",
    title: "字符串查询",
    subtitle: "in / count / find / split",
    analogyTitle: "搜索框",
    analogyBody: "在文字里查找，像在搜索框输入关键词：in 判断有没有、count 数次数、split 按符号切开。",
    concepts: [
      { term: "in", desc: "判断是否包含" },
      { term: "count()", desc: "统计出现次数" },
      { term: "split()", desc: "按符号拆成列表" }
    ],
    examples: [
      { title: "判断包含", code: "s = \"python编程\"\nprint(\"python\" in s)", output: "True" }
    ],
    task: "密信 s = \"python编程\"。用 in 判断信里有没有「python」，并输出判断结果（True 或 False）。",
    requireCode: "[\"']python[\"']\\s*in\\s*s",
    requireMsg: "题目要求用 in 判断是否包含，请写 \"python\" in s。",
    initialCode: "s = \"python编程\"\n# 在这里写代码\n",
    answer: "s = \"python编程\"\nprint(\"python\" in s)",
    expected: "True",
    hints: ["思路：用 in 判断包含，结果是 True/False", "细节：写 子串 in 字符串", "答案：print(\"python\" in s)"],
    exercises: [
      { tier: "热身", task: "统计字符串 \"banana\" 中字母 a 出现的次数并输出", initialCode: "s = \"banana\"\n# 写代码\n", expected: "3", answer: "print(s.count(\"a\"))", hint: "统计某个字符出现几次用字符串的 .count()，把要数的字符传进去，不用自己写循环。", requireCode: "\\.count\\s*\\(", requireMsg: "用 s.count(\"a\") 统计次数。" },
      { tier: "巩固", task: "把 \"apple,banana,pear\" 按逗号拆开，输出列表的第 2 个元素", initialCode: "s = \"apple,banana,pear\"\n# 写代码\n", expected: "banana", answer: "print(s.split(\",\")[1])", hint: "先用 .split() 按逗号把整串拆成列表，再用方括号加下标取第 2 个——下标是 1。", requireCode: "\\.split\\s*\\(", requireMsg: "用 s.split(\",\")[1] 取第 2 个元素。" },
      { tier: "挑战", task: "把 \"1,2,3,4\" 按逗号拆开，输出列表长度和第一个元素（分两行）", initialCode: "s = \"1,2,3,4\"\n# 写代码\n", expected: "4\n1", answer: "li = s.split(\",\")\nprint(len(li))\nprint(li[0])", hint: "拆完的结果先存成变量别丢，一行用 len() 数个数，另一行用下标 0 取第一个元素。", requireCode: "\\.split\\s*\\(", requireMsg: "先 s.split(\",\") 存变量，再输出 len 和第一个元素。" }
    ]
  },
  {
    id: "l2-9",
    eyebrow: "第 25 关 · 一行生成列表",
    title: "列表推导式",
    subtitle: "[表达式 for x in 列表]",
    analogyTitle: "流水线",
    analogyBody: "列表推导式像流水线：给每个元素做同样的加工，一行就生成新列表。",
    concepts: [
      { term: "[表达式 for x in 列表]", desc: "批量加工每个元素" }
    ],
    examples: [
      { title: "乘 2", code: "print([x * 2 for x in [1, 2, 3]])", output: "[2, 4, 6]" }
    ],
    task: "要给 3 个灯笼同时加倍亮度。用列表推导式生成 [1, 2, 3] 每个数乘 2 的新列表，并输出这个列表。",
    requireCode: "for\\s+.*\\s+in\\s+\\[",
    requireMsg: "题目要求用列表推导式，请写 [x * 2 for x in [1,2,3]]。",
    initialCode: "# 在这里写代码\n",
    answer: "print([x * 2 for x in [1, 2, 3]])",
    expected: "[2, 4, 6]",
    hints: ["思路：[ 表达式 for x in 列表 ]", "细节：表达式是每个元素要做的加工", "答案：print([x*2 for x in [1,2,3]])"],
    exercises: [
      { tier: "热身", task: "用推导式生成 [1,2,3] 每个数的平方列表并输出", initialCode: "# 写代码\n", expected: "[1, 4, 9]", answer: "print([x*x for x in [1,2,3]])", hint: "列表推导式一句话生成新列表：方括号里先写对单个元素的加工，再接上从哪里循环取。", requireCode: "for\\s+.*\\s+in\\s+\\[", requireMsg: "用列表推导式 [x*x for x in [1,2,3]]。" },
      { tier: "巩固", task: "用推导式生成 [1,2,3] 每个数平方再减 1 的列表并输出", initialCode: "# 写代码\n", expected: "[0, 3, 8]", answer: "print([x*x - 1 for x in [1,2,3]])", hint: "加工部分可以是复合算式：先算平方再减 1，减 1 要写进同一个表达式里，别分成两步。", requireCode: "for\\s+.*\\s+in\\s+\\[", requireMsg: "用列表推导式 [x*x - 1 for x in [1,2,3]]。" },
      { tier: "挑战", task: "用推导式生成 [1,2,3,4,5] 里的偶数列表并输出", initialCode: "# 写代码\n", expected: "[2, 4]", answer: "print([x for x in [1,2,3,4,5] if x%2==0])", hint: "想筛掉不要的，在推导式末尾再接一个 if 条件，只保留满足条件的；判断偶数看能否被 2 整除。", requireCode: "if\\s+x\\s*%\\s*2", requireMsg: "用推导式加 if 过滤： [x for x in [1,2,3,4,5] if x%2==0]。" }
    ]
  },
  {
    id: "l2-10",
    eyebrow: "第 26 关 · 综合关卡",
    title: "综合：列表+循环+函数",
    subtitle: "综合应用",
    analogyTitle: "大厨做菜",
    analogyBody: "把学过的函数、循环、列表拼起来：用函数封装逻辑、用循环逐个处理、用列表存数据。",
    concepts: [
      { term: "函数", desc: "封装一段逻辑" },
      { term: "循环", desc: "逐个处理" },
      { term: "列表", desc: "存一串数据" }
    ],
    examples: [
      { title: "列表求和", code: "def sum_list(li):\n    s = 0\n    for x in li:\n        s = s + x\n    return s\nprint(sum_list([1, 2, 3]))", output: "6" }
    ],
    task: "皮皮要算账本总和。造一台名叫 sum_list 的机器：给它一个列表，它返回里面所有数字的和。拿 [1, 2, 3] 试一下并输出结果。",
    requireCode: "def\\s+sum_list",
    requireMsg: "题目要求定义函数 sum_list(li) 求和，请写 def sum_list(li): ... return ...。",
    initialCode: "# 在这里写代码\n",
    answer: "def sum_list(li):\n    s = 0\n    for x in li:\n        s = s + x\n    return s\nprint(sum_list([1, 2, 3]))",
    expected: "6",
    hints: ["思路：def 定义函数，for 累加，return 返回", "细节：先 s=0", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 max_list(li) 返回列表最大值，调用 max_list([3,5,2]) 并输出", initialCode: "# 写代码\n", expected: "5", answer: "def max_list(li): return max(li); print(max_list([3,5,2]))", hint: "按题目给的名字和参数写 def，函数体借内置的 max() 求最大值，再用 return 把它送出去。", requireCode: "def\\s+max_list", requireMsg: "请 def max_list(li) 返回最大值。" },
      { tier: "巩固", task: "定义 even_sum(li) 返回偶数之和，调用 even_sum([1,2,3,4]) 并输出", initialCode: "# 写代码\n", expected: "6", answer: "def even_sum(li): return sum(x for x in li if x%2==0); print(even_sum([1,2,3,4]))", hint: "函数里要逐个看元素：只把偶数挑出来相加，累加变量从 0 起，最后用 return 送回总和。", requireCode: "def\\s+even_sum", requireMsg: "请 def even_sum(li) 求偶数之和。" },
      { tier: "挑战", task: "定义 count_even(li) 返回偶数个数，调用 count_even([1,2,3,4]) 并输出", initialCode: "# 写代码\n", expected: "2", answer: "def count_even(li): return sum(1 for x in li if x%2==0); print(count_even([1,2,3,4]))", hint: "数个数不用求和公式：遍历时每遇到一个偶数就把计数器加一，最后 return 这个计数。", requireCode: "def\\s+count_even", requireMsg: "请 def count_even(li) 数偶数个数。" }
    ]
  },
  {
    id: "l2-11",
    eyebrow: "第 27 关 · 往句子里塞值",
    title: "字符串格式化 f-string",
    subtitle: "f\"...{变量}...\"",
    analogyTitle: "填空题",
    analogyBody: "f-string 像填空题：在字符串里用 {变量} 挖个空，运行时代码自动把值填进去。",
    concepts: [
      { term: "f\"...{变量}...\"", desc: "f 前缀，{变量} 插值" }
    ],
    examples: [
      { title: "填变量", code: "name = \"小明\"\nage = 18\nprint(f\"我是{name}，今年{age}岁\")", output: "我是小明，今年18岁" }
    ],
    task: "皮皮要在告示上写「我是小明，今年18岁」（name = \"小明\"、age = 18 已经给你了）。用 f-string 把变量塞进句子，输出结果正好是：我是小明，今年18岁",
    requireCode: "f\\s*[\"']",
    requireMsg: "题目要求用 f-string 格式化，请写 f\"我是{name}，今年{age}岁\"。",
    initialCode: "name = \"小明\"\nage = 18\n# 在这里写代码\n",
    answer: "name = \"小明\"\nage = 18\nprint(f\"我是{name}，今年{age}岁\")",
    expected: "我是小明，今年18岁",
    hints: ["思路：字符串前加 f，变量用 { } 包起来", "细节：f\"\" 里的 {变量} 会被替换成值", "答案：print(f\"我是{name}，今年{age}岁\")"],
    exercises: [
      { tier: "热身", task: "已知 a = 5、b = 3。用 f-string 输出这一行：5+3=8", initialCode: "a = 5\nb = 3\n# 写代码\n", expected: "5+3=8", answer: "print(f\"{a}+{b}={a+b}\")", hint: "f-string 的引号前要加 f，变量名直接放进花括号里，连运算式也能写在花括号中。", requireCode: "f\\s*[\"']", requireMsg: "请用 f-string：f\"{a}+{b}={a+b}\"。" },
      { tier: "巩固", task: "已知 price = 3.5。用 f-string 输出这一行：价格3.5元", initialCode: "price = 3.5\n# 写代码\n", expected: "价格3.5元", answer: "print(f\"价格{price}元\")", hint: "关键在引号前那个 f，写漏了花括号就会被当普通文字；变量放进花括号才会变成真实的值。", requireCode: "f\\s*[\"']", requireMsg: "请用 f-string：f\"价格{price}元\"。" },
      { tier: "挑战", task: "已知 x = 10、y = 4。用 f-string 输出这一行：10减4=6", initialCode: "x = 10\ny = 4\n# 写代码\n", expected: "10减4=6", answer: "print(f\"{x}减{y}={x-y}\")", hint: "两个变量和一次减法都能塞进同一个 f-string：花括号里可以写变量名，也可以写算式。", requireCode: "f\\s*[\"']", requireMsg: "请用 f-string：f\"{x}减{y}={x-y}\"。" }
    ]
  },
  {
    id: "l2-12",
    eyebrow: "第 28 关 · 去重的集合",
    title: "集合 set",
    subtitle: "set 去重",
    analogyTitle: "整理盒",
    analogyBody: "集合像一个自动去重的盒子：放重复的东西它只留一份。用 { } 表示，还能用 in 判断是否包含。",
    concepts: [
      { term: "集合 { }", desc: "自动去重，元素唯一" },
      { term: "len()", desc: "元素个数" }
    ],
    examples: [
      { title: "去重", code: "s = {1, 2, 2, 3}\nprint(len(s))", output: "3" }
    ],
    task: "把 s = {1, 2, 2, 3} 存成集合（重复的 2 会自动合并）。输出集合的长度，看看还剩几个。",
    requireCode: "len\\s*\\(\\s*s",
    requireMsg: "题目要求用集合去重并输出长度，请写 s = {1,2,2,3}; print(len(s))。",
    initialCode: "s = {1, 2, 2, 3}\n# 在这里写代码\n",
    answer: "s = {1, 2, 2, 3}\nprint(len(s))",
    expected: "3",
    hints: ["思路：集合自动去重，{1,2,2,3} 只算 3 个", "细节：用 len(s) 数长度", "答案：print(len(s))"],
    exercises: [
      { tier: "热身", task: "创建集合 s={1,1,2}，输出长度", initialCode: "s = {1,1,2}\n# 写代码\n", expected: "2", answer: "print(len(s))", hint: "集合天生不留重复，两个相同的 1 只会剩一个，再用 len() 数它还剩几个元素。", requireCode: "len\\s*\\(\\s*s", requireMsg: "用 len(s) 输出去重后长度。" },
      { tier: "巩固", task: "创建集合 s={'a','b','a'}，输出长度", initialCode: "s = {'a','b','a'}\n# 写代码\n", expected: "2", answer: "print(len(s))", hint: "建集合时重复元素会被自动丢掉，所以别照原个数数，要用 len() 看实际留下几个。", requireCode: "len\\s*\\(\\s*s", requireMsg: "用 len(s) 输出去重后长度。" },
      { tier: "挑战", task: "求集合 s1={1,2,3} 与 s2={3,4,5} 的交集大小并输出（交集用 & 运算）", initialCode: "s1 = {1,2,3}\ns2 = {3,4,5}\n# 求交集长度", expected: "1", answer: "print(len(s1 & s2))", hint: "两个集合找公共元素用单个 & 符号，得到的是交集集合，再用 len() 数它的大小。", requireCode: "s1\\s*&\\s*s2|s2\\s*&\\s*s1", requireMsg: "用 s1 & s2 求交集，再 len() 数个数。" }
    ]
  },
  {
    id: "l2-13",
    eyebrow: "join 连接",
    title: "用 join 把列表连成字符串",
    subtitle: "分隔符.join(列表)",
    analogyTitle: "串珠子",
    analogyBody: "join 像把一串珠子（列表）用线串起来：\",\".join([\"a\",\"b\"]) 用逗号把 a 和 b 连成 \"a,b\"。",
    concepts: [
      { term: "分隔符.join(列表)", desc: "把列表元素用分隔符连成字符串" }
    ],
    examples: [
      { title: "join", code: "print(\", \".join([\"apple\", \"banana\", \"pear\"]))", output: "apple, banana, pear" }
    ],
    task: "把单词列表 [\"apple\", \"banana\"] 用空格连成一句话并输出（用 join 方法，别拿 + 一个个拼）。",
    requireCode: "\\.join\\s*\\(",
    requireMsg: "题目要求用 join 连接，请写 \" \".join([\"apple\",\"banana\"])，小心引号。",
    initialCode: "# 在这里写代码\n",
    answer: "print(\" \".join([\"apple\", \"banana\"]))",
    expected: "apple banana",
    hints: ["思路：分隔符.join(列表) 连接", "细节：分隔符写在 join 前的引号里", "答案：print(\" \".join([...]))"],
    exercises: [
      { tier: "热身", task: "用 \"-\" 把列表 [\"a\",\"b\",\"c\"] 连成字符串并输出", initialCode: "# 写代码\n", expected: "a-b-c", answer: "print(\"-\".join([\"a\",\"b\",\"c\"]))", hint: "把列表拼成字符串用 .join()，注意分隔符写在前面、列表放后面，分隔符要自己放进引号。", requireCode: "\\.join\\s*\\(", requireMsg: "用 \"-\".join([...])。" },
      { tier: "巩固", task: "用 \" \" 把列表 [\"Python\",\"is\",\"fun\"] 连成一句话并输出", initialCode: "# 写代码\n", expected: "Python is fun", answer: "print(\" \".join([\"Python\",\"is\",\"fun\"]))", hint: ".join() 的写法是分隔符在前、列表在后；想让词之间空一格，就把一个空格写进引号当分隔符。", requireCode: "\\.join\\s*\\(", requireMsg: "用 \" \".join([...])。" },
      { tier: "挑战", task: "把数字列表 [1,2,3] 转成字符串用 \"+\" 连接并输出", initialCode: "li = [1,2,3]\n# 用 join 连接（先把数字转字符串）", expected: "1+2+3", answer: "print(\"+\".join([str(x) for x in [1,2,3]]))", hint: "join 只能连接字符串，数字得先逐个转成字符串再拼，用推导式可以一次全部转换。", requireCode: "\\.join\\s*\\(", requireMsg: "用推导式把数字转字符串，再用 \"+\".join。" }
    ]
  },
  {
    id: "l2-14",
    eyebrow: "列表方法进阶",
    title: "排序、最大、最小",
    subtitle: "sorted / max / min",
    analogyTitle: "整理清单",
    analogyBody: "sorted 排序、max 找最大、min 找最小——内置帮手，一行搞定。",
    concepts: [
      { term: "sorted(列表)", desc: "从小到大排序（返回新列表）" },
      { term: "max/min", desc: "最大/最小值" }
    ],
    examples: [
      { title: "排序", code: "print(sorted([3, 1, 2]))", output: "[1, 2, 3]" }
    ],
    task: "皮皮的战绩是 [3, 1, 2]，他想从小到大排好。用 sorted() 排序并输出排好的列表。",
    requireCode: "sorted|sort",
    requireMsg: "题目要求排序，请用 sorted([3,1,2])。",
    initialCode: "# 在这里写代码\n",
    answer: "print(sorted([3, 1, 2]))",
    expected: "[1, 2, 3]",
    hints: ["思路：sorted(列表) 返回排序后的新列表", "细节：sorted 不改原列表", "答案：print(sorted([3,1,2]))"],
    exercises: [
      { tier: "热身", task: "输出列表 [5,2,9] 的最大值", initialCode: "li = [5,2,9]\n# 写代码\n", expected: "9", answer: "print(max(li))", hint: "内置的 max() 直接把整个列表吃进去，返回里面最大的那个值，不用自己循环比较。", requireCode: "max\\s*\\(", requireMsg: "用 max(li)。" },
      { tier: "巩固", task: "输出列表 [7,3,5] 的最小值", initialCode: "li = [7,3,5]\n# 写代码\n", expected: "3", answer: "print(min(li))", hint: "求最小值和求最大是一对，用内置的 min()，同样把列表整个传进去就行。", requireCode: "min\\s*\\(", requireMsg: "用 min(li)。" },
      { tier: "挑战", task: "对列表 [10,2,8] 从小到大排序，输出排序后第二个数", initialCode: "li = [10,2,8]\n# 写代码\n", expected: "8", answer: "print(sorted(li)[1])", hint: "sorted() 会返回排好序的新列表，排完第二个元素的下标是 1，在结果后面接着写下标取它。", requireCode: "sorted\\s*\\(|sort", requireMsg: "sorted(li)[1] 取排序后第二个。" }
    ]
  },
  {
    id: "l2-14b",
    eyebrow: "原地排序与倒序",
    title: "改在原地，还是排出新的一份",
    subtitle: "列表 .sort() 与 reverse=True",
    analogyTitle: "整理书架 vs 抄新目录",
    analogyBody: "sorted() 像照着原书架抄一份排好序的新目录，原书架一动不动；列表的 .sort() 像直接把书架上的书重新摆一遍——书架变了，而这个「重新摆放」的动作本身什么也不交给你（返回值是 None）。",
    concepts: [
      { term: "列表.sort()", desc: "原地排序：直接改这个列表，不会给新列表" },
      { term: "reverse=True", desc: "加上这个参数就是从大到小（倒序）" },
      { term: "sorted()", desc: "排出新的一份，原列表不动" }
    ],
    examples: [
      { title: "原地排（改自己）", code: "li = [3, 1, 2]\nli.sort()\nprint(li)", output: "[1, 2, 3]" },
      { title: "从大到小", code: "li = [3, 1, 2]\nli.sort(reverse=True)\nprint(li)", output: "[3, 2, 1]" },
      { title: "排出新表（原表不变）", code: "li = [3, 1, 2]\nprint(sorted(li, reverse=True))\nprint(li)", output: "[3, 2, 1]\n[3, 1, 2]" }
    ],
    task: "皮皮想把自己那张战绩表 li = [3, 1, 2] 直接改成从大到小。请用列表自己的 .sort() 方法原地排序（倒序），然后把这张表输出来。",
    requireCode: "\\.sort\\s*\\(",
    requireMsg: "这题要用列表自己的 .sort() 原地排序，不要用 sorted()——sorted 会另给一份新列表，原表不变。",
    initialCode: "li = [3, 1, 2]\n# 用 .sort() 原地排成从大到小\n",
    answer: "li = [3, 1, 2]\nli.sort(reverse=True)\nprint(li)",
    expected: "[3, 2, 1]",
    hints: [
      "思路：列表自带 .sort() 方法，直接在 li 上调用，它改的就是 li 本身",
      "细节：从大到小要加参数 reverse=True；li.sort() 自己不返回东西，别写成 n = li.sort()，那样 n 会是 None",
      "答案：li.sort(reverse=True) 之后再 print(li)"
    ],
    exercises: [
      { tier: "热身", task: "列表 li = [10, 2, 8]，用 .sort() 原地从小到大排好后输出这张列表", initialCode: "li = [10, 2, 8]\n# 写代码\n", expected: "[2, 8, 10]", answer: "li.sort()\nprint(li)", hint: "列表自带 .sort() 方法，直接在 li 上调用，它改的就是 li 本身，不需要接收返回值。", requireCode: "\\.sort\\s*\\(", requireMsg: "用 li.sort()（列表自己的方法），不是 sorted(li)。" },
      { tier: "巩固", task: "输出 [3, 1, 4, 2] 从大到小排好的结果，但不要改动原来那个列表", initialCode: "li = [3, 1, 4, 2]\n# 写代码\n", expected: "[4, 3, 2, 1]", answer: "print(sorted(li, reverse=True))", hint: "不想动原列表就用 sorted()，它排出新的一份；从大到小要加 reverse=True。", requireCode: "sorted\\s*\\(", requireMsg: "要保留原列表就别用 .sort()，改用 sorted(li, reverse=True) 排出新的一份。" },
      { tier: "挑战", task: "列表 li = [7, 3, 9, 1]。先原地从大到小排好，再输出「排好后第 2 个元素」", initialCode: "li = [7, 3, 9, 1]\n# 写代码\n", expected: "7", answer: "li.sort(reverse=True)\nprint(li[1])", hint: "原地排完再从 li 里取下标 1；排好的顺序是 9、7、3、1。", requireCode: "\\.sort\\s*\\(", requireMsg: "先 li.sort(reverse=True)，再取 li[1]。" }
    ]
  },
  {
    id: "l2-15",
    eyebrow: "字典进阶统计",
    title: "用字典统计次数",
    subtitle: "dict 计数",
    analogyTitle: "小会计",
    analogyBody: "用字典给每个东西记数：d[x] = d.get(x, 0) + 1，出现一次就加 1。",
    concepts: [
      { term: "d.get(x, 0)", desc: "取 x 的值，没有则返回 0" },
      { term: "计数", desc: "d[x] = d.get(x, 0) + 1" }
    ],
    examples: [
      { title: "统计", code: "d = {}\nfor x in [\"a\", \"b\", \"a\"]:\n    d[x] = d.get(x, 0) + 1\nprint(d.get(\"a\", 0))", output: "2" }
    ],
    task: "列表 li = [\"a\",\"b\",\"a\"] 里有个字母出现了两次。用字典统计每个字母的次数，然后输出「a」出现了几次。",
    requireCode: "\\.get\\s*\\(",
    requireMsg: "用字典 d[x]=d.get(x,0)+1 统计，再输出 a 的次数。",
    initialCode: "li = [\"a\",\"b\",\"a\"]\n# 用字典统计\n",
    answer: "d = {}\nfor x in li:\n    d[x] = d.get(x, 0) + 1\nprint(d.get(\"a\", 0))",
    expected: "2",
    hints: ["思路：d.get(x,0)+1 每次加一", "细节：先建空字典 d={}", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "统计 [1,2,1,1] 中 1 出现次数并输出", initialCode: "li = [1,2,1,1]\n# 用字典统计\n", expected: "3", answer: "d = {}\nfor x in li:\n    d[x] = d.get(x, 0) + 1\nprint(d.get(1, 0))", hint: "题目要求用字典计数：遍历列表，每遇到一个值就把它的计数加一，用 .get() 取默认 0 防报错。", requireCode: "\\.get\\s*\\(", requireMsg: "用 d.get(x,0)+1 统计。" },
      { tier: "巩固", task: "统计 \"hello\" 中字母出现次数，输出 'l' 的次数", initialCode: "s = \"hello\"\n# 用字典统计\n", expected: "2", answer: "d = {}\nfor x in s:\n    d[x] = d.get(x, 0) + 1\nprint(d.get(\"l\", 0))", hint: "同样是一边遍历一边记数，只不过这次遍历的是字符串，最后按键取值输出，键不存在时 .get() 给默认值。", requireCode: "\\.get\\s*\\(", requireMsg: "用字典统计字符。" },
      { tier: "挑战", task: "统计 [\"x\",\"y\",\"x\",\"z\",\"x\"] 中出现次数最多的字母并输出", initialCode: "li = [\"x\",\"y\",\"x\",\"z\",\"x\"]\n# 写代码\n", expected: "x", answer: "d = {}\nfor v in li:\n    d[v] = d.get(v, 0) + 1\nprint(max(d, key=d.get))", hint: "先照旧把每个元素的出现次数记进字典，再在字典的键里挑计数最大的；给 max() 传一个按值比较的依据。", requireCode: "max\\s*\\(|d\\.get", requireMsg: "统计后 max(d, key=d.get) 找出现最多的。" }
    ]
  },
  {
    id: "l2-16",
    eyebrow: "字符串切片",
    title: "字符串切片与查找",
    subtitle: "s[a:b] / find",
    analogyTitle: "切文字",
    analogyBody: "字符串也能切片：s[1:4] 取下标 1 到 3 的一段；find 找子串位置。",
    concepts: [
      { term: "s[a:b]", desc: "取下标 a 到 b-1 的一段" },
      { term: "s.find(子)", desc: "返回子串位置，找不到返回 -1" }
    ],
    examples: [
      { title: "切片", code: "print(\"hello\"[1:4])", output: "ell" }
    ],
    task: "从字符串 s = \"hello\" 里切一段出来。输出它的第 2 到第 4 个字符（下标 1 到 3，含头不含尾）。",
    requireCode: "\\[\\s*1\\s*:\\s*4\\s*\\]",
    requireMsg: "用切片 \"hello\"[1:4]（含头不含尾）。",
    initialCode: "s = \"hello\"\n# 在这里写代码\n",
    answer: "print(\"hello\"[1:4])",
    expected: "ell",
    hints: ["思路：s[a:b] 取下标 a 到 b-1", "细节：含头不含尾", "答案：print(\"hello\"[1:4])"],
    exercises: [
      { tier: "热身", task: "取字符串 \"python\" 的前 3 个字符并输出", initialCode: "s = \"python\"\n# 写代码\n", expected: "pyt", answer: "print(s[:3])", hint: "切片含头不含尾：想取前 3 个字符，方括号里只写到 3，冒号前空着就表示从开头起。", requireCode: "\\[\\s*:\\s*3\\s*\\]", requireMsg: "用 s[:3] 取前 3 个。" },
      { tier: "巩固", task: "找字符串 \"hello\" 中子串 \"llo\" 的位置并输出", initialCode: "s = \"hello\"\n# 写代码\n", expected: "2", answer: "print(s.find(\"llo\"))", hint: "找子串在哪儿用 .find()，它返回第一次出现的下标；找不到时会返回 -1，而不是报错。", requireCode: "\\.find\\s*\\(", requireMsg: "用 s.find(\"llo\") 返回位置。" },
      { tier: "挑战", task: "取字符串 \"hello world\" 的最后一个字符并输出", initialCode: "s = \"hello world\"\n# 写代码\n", expected: "d", answer: "print(s[-1])", hint: "取最后一个字符用负下标 -1，比用长度减一省事，方括号里只写这一个负数就行。", requireCode: "\\[\\s*-1\\s*\\]", requireMsg: "用 s[-1] 取最后一个。" }
    ]
  },
  {
    id: "l2-17",
    eyebrow: "列表更多方法",
    title: "count / index / remove",
    subtitle: "更多列表操作",
    analogyTitle: "清单管理员",
    analogyBody: "count 数次数、index 找位置、remove 删除一个、insert 插入——列表方法很丰富。",
    concepts: [
      { term: "列表.count(x)", desc: "统计 x 出现次数" },
      { term: "列表.index(x)", desc: "返回 x 的位置" },
      { term: "remove/insert", desc: "删/插" }
    ],
    examples: [
      { title: "数次数", code: "print([1,2,3,2].count(2))", output: "2" }
    ],
    task: "清单 li = [1,2,3,2] 里，数字 2 出现了几次？用 .count() 统计并输出。",
    requireCode: "\\.count\\s*\\(",
    requireMsg: "题目要求统计 2 的次数，用 列表.count(2)。",
    initialCode: "li = [1,2,3,2]\n# 在这里写代码\n",
    answer: "print(li.count(2))",
    expected: "2",
    hints: ["思路：列表.count(元素) 返回次数", "细节：统计出现次数", "答案：print(li.count(2))"],
    exercises: [
      { tier: "热身", task: "找列表 [10,20,30] 中 20 的位置并输出", initialCode: "li = [10,20,30]\n# 写代码\n", expected: "1", answer: "print(li.index(20))", hint: "找元素在列表里的位置用 .index()，它给的是下标，所以第一项的位置是 0 不是 1。", requireCode: "\\.index\\s*\\(", requireMsg: "用 li.index(20) 返回位置。" },
      { tier: "巩固", task: "列表 [\"a\",\"b\",\"c\"]，删除 \"b\" 后输出列表", initialCode: "li = [\"a\",\"b\",\"c\"]\n# 写代码\n", expected: "['a', 'c']", answer: "li.remove(\"b\"); print(li)", hint: "按内容删除用 .remove()，它直接改动原列表、不用接收返回值，删完再输出列表看结果。", requireCode: "\\.remove\\s*\\(", requireMsg: "用 li.remove(\"b\") 再 print。" },
      { tier: "挑战", task: "列表 [1,2,3]，在位置 1 插入数字 9 后输出列表", initialCode: "li = [1,2,3]\n# 写代码\n", expected: "[1, 9, 2, 3]", answer: "li.insert(1, 9); print(li)", hint: "插入用 .insert()，它要两个参数：先写插到哪个位置的下标，再写要插进去的值，插在它前面。", requireCode: "\\.insert\\s*\\(", requireMsg: "用 li.insert(1, 9) 再 print。" }
    ]
  },
  {
    id: "l2-18",
    eyebrow: "嵌套列表",
    title: "嵌套列表（二维）",
    subtitle: "列表里套列表",
    analogyTitle: "表格",
    analogyBody: "嵌套列表像表格：外层是行，内层是列。grid[1][0] 取第 2 行第 1 列。",
    concepts: [
      { term: "嵌套列表", desc: "一个列表里放多个列表" },
      { term: "grid[i][j]", desc: "取第 i 行第 j 列" }
    ],
    examples: [
      { title: "取值", code: "grid = [[1,2],[3,4]]\nprint(grid[1][0])", output: "3" }
    ],
    task: "二维表格 grid = [[1,2],[3,4]]：第 2 行第 1 列是多少？请取出来并输出（要两层下标：先定位行，再定位列）。",
    requireCode: "\\]\\s*\\[",
    requireMsg: "二维取值用 grid[行][列]，如 grid[1][0]。",
    initialCode: "grid = [[1,2],[3,4]]\n# 在这里写代码\n",
    answer: "print(grid[1][0])",
    expected: "3",
    hints: ["思路：grid[i][j] 取第 i 行第 j 列", "细节：下标从 0 开始", "答案：print(grid[1][0])"],
    exercises: [
      { tier: "热身", task: "取二维列表 [[1,2],[3,4]] 的 grid[0][1] 并输出", initialCode: "grid = [[1,2],[3,4]]\n# 写代码\n", expected: "2", answer: "print(grid[0][1])", hint: "二维列表要写两组方括号：前一组选行、后一组选列，行列下标都从 0 开始数。", requireCode: "\\]\\s*\\[", requireMsg: "grid[0][1] 取第 1 行第 2 列。" },
      { tier: "巩固", task: "用 for 遍历二维列表 [[1,2],[3,4]]，输出每个内层行", initialCode: "grid = [[1,2],[3,4]]\n# 写代码\n", expected: "[1, 2]\n[3, 4]", answer: "for row in grid:\n    print(row)", hint: "列表里装的还是列表，用 for 遍历外层，每次取到的就是一整行，输出它自然带方括号。", requireCode: "for\\s+.*\\s+in\\s+grid", requireMsg: "用 for row in grid 遍历行。" },
      { tier: "挑战", task: "用嵌套 for 打印二维列表 [[1,2],[3,4]] 的所有元素", initialCode: "grid = [[1,2],[3,4]]\n# 写代码\n", expected: "1\n2\n3\n4", answer: "for row in grid:\n    for x in row:\n        print(x)", hint: "打印每个数字要两层循环：外层走行，内层再走这一行里的元素，输出语句要缩进到内层里。", requireCode: "for\\s+.*\\s+in\\s+grid", requireMsg: "外层遍历行，内层遍历列逐个打印。" }
    ]
  },
  {
    id: "l3-1",
    eyebrow: "第 29 关 · 出错也能接住",
    title: "异常处理 try / except",
    subtitle: "让程序不崩溃",
    analogyTitle: "安全网",
    analogyBody: "try/except 像安全网：try 里可能会有问题，出错了就掉进 except 接住，程序不崩溃。",
    concepts: [
      { term: "try:", desc: "试着执行的代码" },
      { term: "except:", desc: "出错时执行的代码" }
    ],
    examples: [
      { title: "接住除零", code: "try:\n    print(10 // 0)\nexcept:\n    print(\"不能除以零\")", output: "不能除以零" }
    ],
    task: "咒语有时也会炸。用 try/except 接住 10//0 引发的错误，出错时输出：不能除以零",
    requireCode: "except",
    requireMsg: "题目要求用 try/except 接住错误，请写 try: ... except: ...。",
    initialCode: "# 在这里写代码\n",
    answer: "try:\n    print(10 // 0)\nexcept:\n    print(\"不能除以零\")",
    expected: "不能除以零",
    hints: ["思路：把可能出错的放 try，出错交给 except 处理", "细节：except 后跟着处理代码（缩进）", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 try/except 处理 int('abc')，出错时打印：转换失败", initialCode: "# 写代码\n", expected: "转换失败", answer: "try: print(int('abc')) except: print(\"转换失败\")", hint: "int 转不成数字会抛 ValueError，这句放进 try，处理写在 except 下面，两边都要缩进。", requireCode: "except", requireMsg: "用 try/except 接住错误。" },
      { tier: "巩固", task: "用 try/except 处理 1+'a'，出错时打印：类型不对", initialCode: "# 写代码\n", expected: "类型不对", answer: "try: print(1+'a') except: print(\"类型不对\")", hint: "数字和字符串相加会报 TypeError，用 try 包住这句，except 里写失败时该打印的内容。", requireCode: "except", requireMsg: "用 try/except 接住错误。" },
      { tier: "挑战", task: "用 try/except 处理 len(5)，出错时打印：不能数", initialCode: "# 写代码\n", expected: "不能数", answer: "try: print(len(5)) except: print(\"不能数\")", hint: "len 收不了数字，会抛 TypeError；用 try/except 接住，两个分支下面都要缩进。", requireCode: "except", requireMsg: "用 try/except 接住错误。" }
    ]
  },
  {
    id: "l3-2",
    eyebrow: "第 30 关 · 借用工具箱",
    title: "import math 模块",
    subtitle: "import 使用现成功能",
    analogyTitle: "工具箱",
    analogyBody: "import 像借来一个工具箱：math 里有 sqrt 开方、ceil 向上取整等，import 后就能用。",
    concepts: [
      { term: "import math", desc: "引入 math 模块" },
      { term: "math.sqrt()", desc: "开平方根" }
    ],
    examples: [
      { title: "开方", code: "import math\nprint(math.sqrt(16))", output: "4.0" }
    ],
    task: "借用工具箱里的开方功能：先 import math，再算出 16 的平方根并输出。",
    requireCode: "import\\s+math",
    requireMsg: "题目要求用数学模块，请先 import math 再用 math.sqrt。",
    initialCode: "# 在这里写代码\n",
    answer: "import math\nprint(math.sqrt(16))",
    expected: "4.0",
    hints: ["思路：import math 引入，math.sqrt 开方", "细节：用 math.函数 调用", "答案：import math; print(math.sqrt(16))"],
    exercises: [
      { tier: "热身", task: "import math，输出 math.sqrt(9)", initialCode: "# 写代码\n", expected: "3.0", answer: "import math; print(math.sqrt(9))", hint: "先 import 引入 math 模块，开平方用 sqrt，调用时别忘了加模块名前缀。", requireCode: "math\\.sqrt\\s*\\(", requireMsg: "用 math.sqrt(9)。" },
      { tier: "巩固", task: "import math，输出 math.ceil(3.2)", initialCode: "# 写代码\n", expected: "4", answer: "import math; print(math.ceil(3.2))", hint: "一样要先 import 引入 math；向上取整要用 ceil，调用时带上模块前缀。", requireCode: "math\\.ceil", requireMsg: "用 math.ceil(3.2)。" },
      { tier: "挑战", task: "import math，输出 math.floor(3.8)", initialCode: "# 写代码\n", expected: "3", answer: "import math; print(math.floor(3.8))", hint: "先 import 引入 math 模块，向下取整用 floor，别和向上取整记混。", requireCode: "math\\.floor", requireMsg: "用 math.floor(3.8)。" }
    ]
  },
  {
    id: "l3-3",
    eyebrow: "第 31 关 · 数一数出现的次数",
    title: "字典统计词频",
    subtitle: "count / dict 计数",
    analogyTitle: "小会计",
    analogyBody: "统计一个东西出现几次，像会计记账。用列表.count() 快速统计次数。",
    concepts: [
      { term: "列表.count(元素)", desc: "统计元素出现次数" }
    ],
    examples: [
      { title: "统计次数", code: "li = ['a', 'b', 'a']\nprint(li.count('a'))", output: "2" }
    ],
    task: "清点物资：列表 li = ['a', 'b', 'a'] 里，'a' 出现了几次？用 .count() 统计并输出。",
    requireCode: "\\.count\\s*\\(",
    requireMsg: "题目要求统计次数，用 列表.count('a')。",
    initialCode: "li = ['a', 'b', 'a']\n# 在这里写代码\n",
    answer: "li = ['a', 'b', 'a']\nprint(li.count('a'))",
    expected: "2",
    hints: ["思路：列表.count(元素) 返回次数", "细节：把想统计的写进 count", "答案：print(li.count('a'))"],
    exercises: [
      { tier: "热身", task: "统计列表 [1,2,1,1] 中 1 出现的次数并输出", initialCode: "li = [1,2,1,1]\n# 写代码\n", expected: "3", answer: "print(li.count(1))", hint: "列表自带 count 方法，点号调用后把要找的元素写进括号，它就会返回出现次数。", requireCode: "\\.count\\s*\\(", requireMsg: "用 li.count(1)。" },
      { tier: "巩固", task: "统计列表 ['x','y','x','z'] 中 'x' 出现的次数并输出", initialCode: "li = ['x','y','x','z']\n# 写代码\n", expected: "2", answer: "print(li.count('x'))", hint: "还是 count，不过这次统计的是字符串元素，括号里记得给元素加引号。", requireCode: "\\.count\\s*\\(", requireMsg: "用 li.count('x')。" },
      { tier: "挑战", task: "统计字符串 'hello' 中 'l' 出现的次数并输出", initialCode: "s = 'hello'\n# 写代码\n", expected: "2", answer: "print(s.count('l'))", hint: "字符串也能用 count 方法，括号里写想统计的那个字符，别只想着列表。", requireCode: "\\.count\\s*\\(", requireMsg: "用 s.count('l')。" }
    ]
  },
  {
    id: "l3-4",
    eyebrow: "第 32 关 · 一次返回多个",
    title: "函数返回多值",
    subtitle: "return a, b",
    analogyTitle: "打包快递",
    analogyBody: "函数能一次返回多个值，像打包成一个包裹，用 return a, b 逗号隔开。",
    concepts: [
      { term: "return a, b", desc: "返回多个值（元组）" }
    ],
    examples: [
      { title: "返回最小最大", code: "def min_max(li):\n    return min(li), max(li)\nprint(min_max([1, 3, 2]))", output: "(1, 3)" }
    ],
    task: "造一台名叫 min_max 的机器：给它一个列表，一次返回「最小值」和「最大值」两个结果。拿 [1, 3, 2] 试一下并输出。",
    requireCode: "def\\s+min_max",
    requireMsg: "题目要求定义函数 min_max，请用 return min(li), max(li)。",
    initialCode: "# 在这里写代码\n",
    answer: "def min_max(li):\n    return min(li), max(li)\nprint(min_max([1, 3, 2]))",
    expected: "(1, 3)",
    hints: ["思路：return 用逗号隔开返回多个", "细节：min/max 取最小最大", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 first_last(li) 返回第一个和最后一个，调用 first_last([9,5,7]) 并输出", initialCode: "# 写代码\n", expected: "(9, 7)", answer: "def first_last(li): return li[0], li[-1]; print(first_last([9,5,7]))", hint: "函数里一次 return 两个值，中间用逗号隔开；首尾元素分别用下标 0 和 -1。", requireCode: "def\\s+first_last", requireMsg: "定义 first_last 返回 (li[0], li[-1])。" },
      { tier: "巩固", task: "定义 div_mod(a,b) 返回商和余数，调用 div_mod(17,5) 并输出", initialCode: "# 写代码\n", expected: "(3, 2)", answer: "def div_mod(a,b): return a//b, a%b; print(div_mod(17,5))", hint: "两个结果写在同一个 return 后，用逗号分开；商用整除，余数用百分号取余。", requireCode: "def\\s+div_mod", requireMsg: "定义 div_mod 返回 (a//b, a%b)。" },
      { tier: "挑战", task: "定义 max_min(li) 返回最大值和最小值，调用 max_min([4,1,9]) 并输出", initialCode: "# 写代码\n", expected: "(9, 1)", answer: "def max_min(li): return max(li), min(li); print(max_min([4,1,9]))", hint: "借助内置的 max 和 min 拿到两端值，再用逗号把两个结果一起 return。", requireCode: "def\\s+max_min", requireMsg: "定义 max_min 返回 (max(li), min(li))。" }
    ]
  },
  {
    id: "l3-5",
    eyebrow: "第 33 关 · 自己的模板",
    title: "类 class 入门",
    subtitle: "class / __init__ / 方法",
    analogyTitle: "模具",
    analogyBody: "类像模具：按它做出一个个对象。__init__ 是\"出生时设置属性\"，方法就是对象能做的事。",
    concepts: [
      { term: "class 类名:", desc: "定义类（模板）" },
      { term: "self", desc: "代表对象自己" },
      { term: "方法", desc: "类里的函数" }
    ],
    examples: [
      { title: "Person 类", code: "class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return \"你好，我是\" + self.name\np = Person(\"小明\")\nprint(p.greet())", output: "你好，我是小明" }
    ],
    task: "造一个「人」的模板，类名 Person：它能存下一个名字，并且会打招呼，说「你好，我是X」（X 是名字）。用「小明」造一个，把招呼语输出来。",
    requireCode: "class\\s+Person",
    requireMsg: "题目要求定义类 Person，请写 class Person: ... 并实例化调用 greet()。",
    initialCode: "# 在这里写代码\n",
    answer: "class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return \"你好，我是\" + self.name\np = Person(\"小明\")\nprint(p.greet())",
    expected: "你好，我是小明",
    hints: ["思路：class 定义，__init__ 存属性，方法用 self", "细节：实例化 类名(参数)", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 Dog 类，方法 bark() 返回\"汪汪\"，实例化调用并输出", initialCode: "# 写代码\n", expected: "汪汪", answer: "class Dog:\n    def bark(self):\n        return \"汪汪\"\nprint(Dog().bark())", hint: "类里的方法第一个参数写 self；要先造出对象，再用点号调用它的方法。", requireCode: "class\\s+Dog", requireMsg: "定义 Dog 类含 bark() 方法，实例化调用。" },
      { tier: "巩固", task: "定义 Rectangle 类，__init__ 存宽高，方法 area() 返回面积，实例化宽4高5并输出面积", initialCode: "# 写代码\n", expected: "20", answer: "class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\nprint(Rectangle(4,5).area())", hint: "__init__ 里用 self 把宽高存成属性，area 方法里再通过 self 取出来相乘。", requireCode: "class\\s+Rectangle", requireMsg: "定义 Rectangle 类，area() 返回 self.w*self.h。" },
      { tier: "挑战", task: "定义 Cat 类，__init__ 存名字，方法 describe() 返回\"一只叫X的猫\"，实例化\"咪咪\"并输出", initialCode: "# 写代码\n", expected: "一只叫咪咪的猫", answer: "class Cat:\n    def __init__(self, name):\n        self.name = name\n    def describe(self):\n        return \"一只叫\" + self.name + \"的猫\"\nprint(Cat(\"咪咪\").describe())", hint: "__init__ 把名字挂到 self 上，describe 里拼接文字时用 str 把属性转成字符串。", requireCode: "class\\s+Cat", requireMsg: "定义 Cat 类，describe() 返回描述。" }
    ]
  },
  {
    id: "l3-6",
    eyebrow: "第 34 关 · 切一段",
    title: "列表切片",
    subtitle: "li[a:b]",
    analogyTitle: "切蛋糕",
    analogyBody: "列表切片像切蛋糕：li[1:4] 取从下标 1 到 3（含头不含尾）的一段。",
    concepts: [
      { term: "li[a:b]", desc: "取下标 a 到 b-1 的一段" },
      { term: "负下标", desc: "从后往前数" }
    ],
    examples: [
      { title: "切片", code: "li = [1,2,3,4,5]\nprint(li[1:4])", output: "[2, 3, 4]" }
    ],
    task: "取列表 li = [1,2,3,4,5] 中间的一段。输出下标 1 到 3 的元素（也就是第 2~4 个，含头不含尾）。",
    requireCode: "\\[\\s*1\\s*:\\s*4\\s*\\]",
    requireMsg: "用切片 li[1:4]（含头不含尾）取下标 1~3。",
    initialCode: "li = [1,2,3,4,5]\n# 在这里写代码\n",
    answer: "li = [1,2,3,4,5]\nprint(li[1:4])",
    expected: "[2, 3, 4]",
    hints: ["思路：li[a:b] 取下标 a 到 b-1", "细节：含头不含尾", "答案：print(li[1:4])"],
    exercises: [
      { tier: "热身", task: "取列表 [1,2,3,4,5] 的前 3 个并输出", initialCode: "li = [1,2,3,4,5]\n# 写代码\n", expected: "[1, 2, 3]", answer: "print(li[:3])", hint: "用方括号里的冒号做切片，取前几个时只写结束下标，这个下标本身取不到。", requireCode: "\\[\\s*:\\s*3\\s*\\]", requireMsg: "用 li[:3] 取前 3 个。" },
      { tier: "巩固", task: "取列表 [10,20,30,40] 的后 2 个并输出", initialCode: "li = [10,20,30,40]\n# 写代码\n", expected: "[30, 40]", answer: "print(li[2:])", hint: "同样用冒号，这次起点写下标、终点留空，就能一直取到列表末尾。", requireCode: "\\[\\s*2\\s*:\\s*\\]", requireMsg: "用 li[2:] 取后 2 个。" },
      { tier: "挑战", task: "取列表 [5,10,15,20,25] 的下标 1 到 3，把每个数加 1 后输出（用推导式）", initialCode: "li = [5,10,15,20,25]\n# 写代码\n", expected: "[11, 16, 21]", answer: "print([x + 1 for x in li[1:4]])", hint: "先切片取中间一段，再用列表推导式遍历 li（循环变量写 x）给每个元素加一，终点下标取不到。", requireCode: "for\\s+x\\s+in\\s+li", requireMsg: "切片 li[1:4] 后用推导式每个加 1。" }
    ]
  },
  {
    id: "l3-7",
    eyebrow: "第 35 关 · 遍历字典",
    title: "字典遍历",
    subtitle: "for k, v in d.items()",
    analogyTitle: "翻通讯录",
    analogyBody: "遍历字典像翻通讯录：for k in d 取所有键，for k,v in d.items() 按键值对一起取。",
    concepts: [
      { term: "for k in d:", desc: "遍历所有键" },
      { term: "d.items()", desc: "键值对" },
      { term: "d.values()", desc: "所有值" }
    ],
    examples: [
      { title: "遍历键", code: "d = {\"apple\":3,\"banana\":2}\nfor k in d:\n    print(k)", output: "apple\nbanana" }
    ],
    task: "遍历字典 d = {\"apple\":3,\"banana\":2}，把所有的键逐个输出，每个占一行。",
    requireCode: "for\\s+.*\\s+in\\s+[a-z]\\b|in\\s+d",
    requireMsg: "用 for k in d 遍历字典的键。",
    initialCode: "d = {\"apple\":3,\"banana\":2}\n# 在这里写代码\n",
    answer: "d = {\"apple\":3,\"banana\":2}\nfor k in d:\n    print(k)",
    expected: "apple\nbanana",
    hints: ["思路：for k in d 遍历键", "细节：键按插入顺序", "答案：for k in d: print(k)"],
    exercises: [
      { tier: "热身", task: "遍历字典 {\"x\":1,\"y\":2,\"z\":3}，输出所有值", initialCode: "d = {\"x\":1,\"y\":2,\"z\":3}\n# 写代码\n", expected: "1\n2\n3", answer: "for v in d.values(): print(v)", hint: "要只看字典的值，用 values 方法遍历；循环体里逐个输出，注意缩进。", requireCode: "values\\s*\\(", requireMsg: "用 for v in d.values() 遍历值。" },
      { tier: "巩固", task: "遍历字典 {\"a\":10,\"b\":20}，输出\"键:值\" 每行一个", initialCode: "d = {\"a\":10,\"b\":20}\n# 写代码\n", expected: "a:10\nb:20", answer: "for k, v in d.items():\n    print(str(k) + \":\" + str(v))", hint: "用 items 一次取回键和值，遍历时用两个变量接住；拼接前要先转成字符串。", requireCode: "items\\s*\\(", requireMsg: "用 for k,v in d.items() 输出键值对。" },
      { tier: "挑战", task: "统计列表 [\"a\",\"b\",\"a\"] 每个字母出现次数，输出 'a' 的次数", initialCode: "li = [\"a\",\"b\",\"a\"]\n# 用字典统计次数", expected: "2", answer: "d = {}\nfor x in li:\n    d[x] = d.get(x, 0) + 1\nprint(d.get(\"a\", 0))", hint: "准备一个空字典当计数器，用 get 给没见过的键兜个默认值，统计完再取出那个键。", requireCode: "\\.get\\s*\\(|d\\s*\\[", requireMsg: "用字典 d 统计：d[x]=d.get(x,0)+1，再输出 a 的次数。" }
    ]
  },
  {
    id: "l3-8",
    eyebrow: "第 36 关 · 综合项目",
    title: "综合：单词统计",
    subtitle: "字符串+列表+字典",
    analogyTitle: "文字小统计员",
    analogyBody: "把学过的字符串、列表、字典、循环拼起来，写一个小小的文本统计程序。",
    concepts: [
      { term: "split", desc: "按空格拆成单词列表" },
      { term: "dict 统计", desc: "记录每个词出现次数" },
      { term: "for 遍历", desc: "逐个处理" }
    ],
    examples: [
      { title: "统计次数", code: "s = \"apple banana apple\"\nprint(s.split().count(\"apple\"))", output: "2" }
    ],
    task: "句子 s = \"apple banana apple\" 里，「apple」一共出现了几次？先用 split() 拆成单词，再统计并输出次数。",
    requireCode: "split|\\.count",
    requireMsg: "用 split() 拆成单词，再统计 apple 次数。",
    initialCode: "s = \"apple banana apple\"\n# 在这里写代码\n",
    answer: "s = \"apple banana apple\"\nprint(s.split().count(\"apple\"))",
    expected: "2",
    hints: ["思路：split() 拆列表，count 统计", "细节：split() 不加参数默认按空格", "答案：print(s.split().count(\"apple\"))"],
    exercises: [
      { tier: "热身", task: "统计句子 \"hi python\" 含多少个单词", initialCode: "s = \"hi python\"\n# 写代码\n", expected: "2", answer: "print(len(s.split()))", hint: "先用 split 把句子按空格拆成单词列表，再数这个列表有几个元素。", requireCode: "split", requireMsg: "用 len(s.split()) 数单词。" },
      { tier: "巩固", task: "统计句子 \"a b c a\" 中 \"a\" 出现的次数", initialCode: "s = \"a b c a\"\n# 写代码\n", expected: "2", answer: "print(s.split().count(\"a\"))", hint: "先 split 拆出单词，再对得到的列表用 count，括号里写要统计的那个词。", requireCode: "split|\\.count", requireMsg: "用 s.split().count(\"a\")。" },
      { tier: "挑战", task: "用字典统计句子 \"apple banana apple\" 每个单词出现次数，输出 \"banana\" 的次数", initialCode: "s = \"apple banana apple\"\n# 用字典统计", expected: "1", answer: "d = {}\nfor w in s.split():\n    d[w] = d.get(w, 0) + 1\nprint(d.get(\"banana\", 0))", hint: "split 拆词后新建空字典，遍历单词累计次数，最后取出目标单词对应的值。", requireCode: "d\\s*\\[|get\\s*\\(", requireMsg: "用字典 d 统计单词，再输出 banana 次数。" }
    ]
  },
  {
    id: "l3-9",
    eyebrow: "面向对象进阶",
    title: "类的 __str__ 与更多方法",
    subtitle: "特殊方法 __str__",
    analogyTitle: "对象的自我介绍",
    analogyBody: "__str__ 是类的\"特殊方法\"，定义怎么把对象转成文字。print(对象) 时会调它。",
    concepts: [
      { term: "__str__", desc: "转成文字的特殊方法" },
      { term: "实例方法", desc: "用 self 访问属性的方法" }
    ],
    examples: [
      { title: "自定义打印", code: "class P:\n    def __init__(self, n):\n        self.n = n\n    def __str__(self):\n        return \"我是\" + self.n\nprint(P(\"小明\"))", output: "我是小明" }
    ],
    task: "定义一个类 P：创建时存下一个名字，并且让它被 print 时自动输出「我是X」（用 __str__ 实现）。打印 P(\"小明\") 看结果。",
    requireCode: "__str__",
    requireMsg: "题目要求定义 __str__ 方法，请写 def __str__(self): return ...。",
    initialCode: "# 在这里写代码\n",
    answer: "class P:\n    def __init__(self, n):\n        self.n = n\n    def __str__(self):\n        return \"我是\" + self.n\nprint(P(\"小明\"))",
    expected: "我是小明",
    hints: ["思路：__str__ 定义对象转文字的方式", "细节：print(对象) 会调用 __str__", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义类 R，__str__ 返回\"圆\"，打印 R()", initialCode: "# 写代码\n", expected: "圆", answer: "class R:\n    def __str__(self):\n        return \"圆\"\nprint(R())", hint: "在类里定义 __str__ 特殊方法，它只接 self，把要显示的文字直接 return。", requireCode: "__str__", requireMsg: "定义 __str__ 返回\"圆\"。" },
      { tier: "巩固", task: "定义类 S，__init__ 存长度，__str__ 返回\"长X\"，打印 S(5)", initialCode: "# 写代码\n", expected: "长5", answer: "class S:\n    def __init__(self, l):\n        self.l = l\n    def __str__(self):\n        return \"长\" + str(self.l)\nprint(S(5))", hint: "__init__ 里先把长度存成属性，__str__ 里用 str 把数字转成文字再拼接。", requireCode: "__str__", requireMsg: "__str__ 里用 str(self.l)。" },
      { tier: "挑战", task: "定义类 C，__init__ 存 x,y，__str__ 返回\"(x,y)\"，打印 C(3,4)", initialCode: "# 写代码\n", expected: "(3,4)", answer: "class C:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __str__(self):\n        return \"(\" + str(self.x) + \",\" + str(self.y) + \")\"\nprint(C(3,4))", hint: "__init__ 存好两个坐标属性，__str__ 里先转成文字再按括号加逗号的格式拼接。", requireCode: "__str__", requireMsg: "__str__ 返回 \"(x,y)\" 格式。" }
    ]
  },
  {
    id: "l3-10",
    eyebrow: "文件读写",
    title: "读写文件",
    subtitle: "open / write / read",
    analogyTitle: "记事本",
    analogyBody: "open 打开文件，write 写、read 读——像在记事本里记录和查看。",
    concepts: [
      { term: "open(名,\"w\")", desc: "打开写" },
      { term: ".write()", desc: "写入" },
      { term: ".read()", desc: "读取" }
    ],
    examples: [
      { title: "写读", code: "open(\"a.txt\", \"w\").write(\"你好\")\nprint(open(\"a.txt\").read())", output: "你好" }
    ],
    task: "把 hi 存进文件 a.txt，然后把它读回来并输出。",
    requireCode: "open\\s*\\(",
    requireMsg: "用 open(文件名,\"w\").write(\"hi\") 写，再 open.read() 读。",
    initialCode: "# 在这里写代码\n",
    answer: "open(\"a.txt\", \"w\").write(\"hi\")\nprint(open(\"a.txt\").read())",
    expected: "hi",
    hints: ["思路：open 写入，再读取打印", "细节：写入后读取同一文件", "答案：open(..).write(..); print(open(..).read())"],
    exercises: [
      { tier: "热身", task: "写文件 \"b.txt\" 内容\"abc\"，读取并输出", initialCode: "# 写代码\n", expected: "abc", answer: "open(\"b.txt\",\"w\").write(\"abc\")\nprint(open(\"b.txt\").read())", hint: "打开文件要带上文件名和模式，写时用 w，读的时候不用给模式，分两步来做。", requireCode: "open\\s*\\(", requireMsg: "用 open 写再读。" },
      { tier: "巩固", task: "写文件 \"c.txt\" 两行\"1\"和\"2\"，读取并输出", initialCode: "# 写代码\n", expected: "1\n2", answer: "open(\"c.txt\",\"w\").write(\"1\\n2\")\nprint(open(\"c.txt\").read())", hint: "写入的内容里要放换行符 \\n，两行才会分开；写完再读回来输出。", requireCode: "open\\s*\\(", requireMsg: "写入含换行 \\n。" },
      { tier: "挑战", task: "写文件 \"d.txt\" 内容\"python\"，读取后转大写并输出", initialCode: "# 写代码\n", expected: "PYTHON", answer: "open(\"d.txt\",\"w\").write(\"python\")\ns = open(\"d.txt\").read()\nprint(s.upper())", hint: "先用写模式存下文字，再读出来调用字符串的 upper 方法转成大写。", requireCode: "open\\s*\\(", requireMsg: "读出来再 .upper()。" }
    ]
  },
  {
    id: "l3-11",
    eyebrow: "random 模块",
    title: "random 随机数",
    subtitle: "import random / randint",
    analogyTitle: "骰子",
    analogyBody: "random 像掷骰子：random.randint(1,6) 随机出一个 1~6 的整数。教你怎么取随机数。",
    concepts: [
      { term: "import random", desc: "引入随机模块" },
      { term: "random.randint(a,b)", desc: "随机整数 a~b" },
      { term: "random.choice(列表)", desc: "随机取一个元素" }
    ],
    examples: [
      { title: "掷骰子", code: "import random\nprint(random.randint(1, 1))", output: "1" }
    ],
    task: "掷一次骰子：先 import random，用 random.randint 随机取一个数。本次范围是 1 到 1，所以结果固定是 1，方便判题——把它输出。",
    requireCode: "import\\s+random.*random\\.randint|random\\.randint",
    requireMsg: "用 import random 后调用 random.randint(1,1)。",
    initialCode: "# 在这里写代码\n",
    answer: "import random\nprint(random.randint(1, 1))",
    expected: "1",
    hints: ["思路：import random 引入，random.randint(a,b) 取随机数", "细节：范围相同则结果唯一", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "import random，输出 random.randint(5,5)", initialCode: "# 写代码\n", expected: "5", answer: "import random; print(random.randint(5,5))", hint: "先 import 引入 random 模块，取随机整数用 randint，两端写一样结果固定。", requireCode: "random\\.randint", requireMsg: "random.randint(5,5) 恒为 5。" },
      { tier: "巩固", task: "import random，输出 random.choice([7,7,7])", initialCode: "# 写代码\n", expected: "7", answer: "import random; print(random.choice([7,7,7]))", hint: "import 引入 random 之后，从列表里随机挑一个用 choice，别忘了模块名。", requireCode: "random\\.choice", requireMsg: "random.choice([7,7,7]) 恒为 7。" },
      { tier: "挑战", task: "import random，输出 random.randint(3,3) 加 4 的结果", initialCode: "# 写代码\n", expected: "7", answer: "import random; print(random.randint(3,3) + 4)", hint: "先 import 引入 random，用 randint 取随机整数，再让这个结果参与加法。", requireCode: "random\\.randint", requireMsg: "random.randint(3,3)=3，再加 4。" }
    ]
  },
  {
    id: "l3-12",
    eyebrow: "综合项目 · 计算器",
    title: "综合：四则计算器",
    subtitle: "函数 + if/elif + 输入",
    analogyTitle: "做一个小计算器",
    analogyBody: "把函数、条件、运算拼起来，写一个能做 + - * / 的小计算器。",
    concepts: [
      { term: "def calc(a, op, b)", desc: "传入两个数和运算符" },
      { term: "if/elif", desc: "按运算符分流" },
      { term: "return", desc: "返回计算结果" }
    ],
    examples: [
      { title: "计算器", code: "def calc(a, op, b):\n    if op == \"+\":\n        return a + b\n    elif op == \"-\":\n        return a - b\n    elif op == \"*\":\n        return a * b\n    elif op == \"/\":\n        return a / b\nprint(calc(5, \"*\", 4))", output: "20" }
    ],
    task: "造一台四则计算器，函数名 calc：收到两个数和一个运算符（+ - * /），返回算好的结果。让它算 5 乘 4 并输出。",
    requireCode: "def\\s+calc",
    requireMsg: "定义 calc(a,op,b)，用 if/elif 按 op 返回结果，再调用。",
    initialCode: "# 在这里写代码\n",
    answer: "def calc(a, op, b):\n    if op == \"+\":\n        return a + b\n    elif op == \"-\":\n        return a - b\n    elif op == \"*\":\n        return a * b\n    elif op == \"/\":\n        return a / b\nprint(calc(5, \"*\", 4))",
    expected: "20",
    hints: ["思路：def calc 用 if/elif 判断 op", "细节：return 对应运算结果", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "调用同样的 calc(a,op,b)，输出 calc(8,\"-\",3)", initialCode: "def calc(a, op, b):\n    if op == \"+\": return a+b\n    elif op == \"-\": return a-b\n    elif op == \"*\": return a*b\n    elif op == \"/\": return a/b\n# 写代码\n", expected: "5", answer: "print(calc(8, \"-\", 3))", hint: "calc 函数已经写好，直接调用它，按「数字、运算符、数字」的顺序传三个参数。", requireCode: "def\\s+calc|calc\\s*\\(", requireMsg: "调用 calc(8,\"-\",3)。" },
      { tier: "巩固", task: "调用 calc，输出 calc(3,\"/\",2) 的结果", initialCode: "def calc(a, op, b):\n    if op == \"+\": return a+b\n    elif op == \"-\": return a-b\n    elif op == \"*\": return a*b\n    elif op == \"/\": return a/b\n# 写代码\n", expected: "1.5", answer: "print(calc(3, \"/\", 2))", hint: "调用时参数顺序别放错：两个数字中间夹一个运算符，除法得到的是小数。", requireCode: "calc\\s*\\(", requireMsg: "调用 calc(3,\"/\",2)，3/2=1.5。" },
      { tier: "挑战", task: "定义函数 sq(n) 返回 n 的平方，调用 calc 和 sq 计算 (5*4) 的平方，即 sq(calc(5,\"*\",4))，输出", initialCode: "# 写代码\n", expected: "400", answer: "def calc(a,op,b):\n    if op==\"*\": return a*b\ndef sq(n):\n    return n*n\nprint(sq(calc(5,\"*\",4)))", hint: "先把乘法交给 calc 算出中间结果，再把结果传给求平方的 sq，两个函数都要定义好。", requireCode: "def\\s+calc|def\\s+sq|calc\\s*\\(", requireMsg: "先 calc 求 5*4=20，再 sq(20)=400。" }
    ]
  },
  {
    id: "l3-13",
    eyebrow: "综合项目 · 温度转换",
    title: "摄氏转华氏",
    subtitle: "函数 + 运算",
    analogyTitle: "换算汇率",
    analogyBody: "温度换算像换汇率：摄氏 x 9/5 + 32 = 华氏。用函数封装这个公式。",
    concepts: [
      { term: "def c_to_f(c)", desc: "摄氏度转华氏度的函数" },
      { term: "公式", desc: "华氏 = 摄氏 * 9/5 + 32" }
    ],
    examples: [
      { title: "摄氏0度", code: "def c_to_f(c):\n    return c * 9 / 5 + 32\nprint(c_to_f(0))", output: "32.0" }
    ],
    task: "写一个温度转换器，函数名 c_to_f：摄氏转华氏的公式是「华氏 = 摄氏 × 9/5 + 32」。把 20 摄氏度转换过去并输出。",
    requireCode: "def\\s+c_to_f",
    requireMsg: "定义 c_to_f(c)，返回 c*9/5+32。",
    initialCode: "# 在这里写代码\n",
    answer: "def c_to_f(c):\n    return c * 9 / 5 + 32\nprint(c_to_f(20))",
    expected: "68.0",
    hints: ["思路：def 封装公式，return c*9/5+32", "细节：乘除优先，加 32", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "调用 c_to_f，输出 c_to_f(100)", initialCode: "def c_to_f(c):\n    return c * 9 / 5 + 32\n# 写代码\n", expected: "212.0", answer: "print(c_to_f(100))", hint: "c_to_f 应该已经定义好了，把摄氏温度当参数传进去调用，得到的是小数。", requireCode: "c_to_f\\s*\\(", requireMsg: "调用 c_to_f(100)。" },
      { tier: "巩固", task: "定义 f_to_c(f) 返回 摄氏 = (f-32)*5/9，调用 f_to_c(212) 并输出", initialCode: "# 写代码\n", expected: "100.0", answer: "def f_to_c(f):\n    return (f - 32) * 5 / 9\nprint(f_to_c(212))", hint: "定义 f_to_c 时把公式写进 return，先减再乘除，括号别漏，否则顺序会错。", requireCode: "def\\s+f_to_c", requireMsg: "定义 f_to_c，返回 (f-32)*5/9。" },
      { tier: "挑战", task: "定义 k_to_c(k) 返回 摄氏 = k - 273.15，调用 k_to_c(300) 并输出", initialCode: "# 写代码\n", expected: "26.85", answer: "def k_to_c(k):\n    return k - 273.15\nprint(k_to_c(300))", hint: "定义 k_to_c 时函数体只有一行 return，用开氏温度减去一个固定的小数差值。", requireCode: "def\\s+k_to_c", requireMsg: "定义 k_to_c，返回 k-273.15。" }
    ]
  },
  {
    id: "l3-14",
    eyebrow: "综合项目 · 数据统计",
    title: "数据处理：统计函数",
    subtitle: "函数 + 列表 + 元组",
    analogyTitle: "数据小管家",
    analogyBody: "用一个函数封装对一组数据的统计：最大、最小、求和，一次返回多个。",
    concepts: [
      { term: "def data_stats(li)", desc: "统计一组数据" },
      { term: "return a, b, c", desc: "返回多个统计值（元组）" }
    ],
    examples: [
      { title: "统计", code: "def data_stats(li):\n    return max(li), min(li), sum(li)\nprint(data_stats([3, 1, 2]))", output: "(3, 1, 6)" }
    ],
    task: "写一台统计机器，函数名 data_stats：给它一个列表，一次返回「最大值、最小值、总和」三个数。拿 [3, 1, 2] 试一下并输出。",
    requireCode: "def\\s+data_stats",
    requireMsg: "定义 data_stats(li)，用 return max,min,sum。",
    initialCode: "# 在这里写代码\n",
    answer: "def data_stats(li):\n    return max(li), min(li), sum(li)\nprint(data_stats([3, 1, 2]))",
    expected: "(3, 1, 6)",
    hints: ["思路：return 用逗号返回多个", "细节：max/min/sum 内置函数", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 avg(li) 返回平均值，调用 avg([2,4,6]) 并输出", initialCode: "# 写代码\n", expected: "4.0", answer: "def avg(li): return sum(li)/len(li); print(avg([2,4,6]))", hint: "定义 avg 接收列表，把总和除以个数，求和和计数分别用内置的 sum 与 len。", requireCode: "def\\s+avg", requireMsg: "定义 avg(li) 返回 sum/len。" },
      { tier: "巩固", task: "定义 total(li) 返回列表和，调用 total([5,7,8]) 并输出", initialCode: "# 写代码\n", expected: "20", answer: "def total(li): return sum(li); print(total([5,7,8]))", hint: "定义 total 接收列表，函数体直接 return 内置求和函数的结果，一行就够。", requireCode: "def\\s+total", requireMsg: "定义 total(li) 返回 sum(li)。" },
      { tier: "挑战", task: "定义 range_len(li) 返回元组(最大值-最小值, 个数)，调用 range_len([3,9,1]) 并输出", initialCode: "# 写代码\n", expected: "(8, 3)", answer: "def range_len(li): return max(li)-min(li), len(li); print(range_len([3,9,1]))", hint: "用 max 和 min 求出差值、用 len 数个数，两个结果用逗号一起 return 出去。", requireCode: "def\\s+range_len", requireMsg: "return (max-min, len)。" }
    ]
  },
  {
    id: "l3-15",
    eyebrow: "综合项目 · 文本分析",
    title: "文本分析器",
    subtitle: "字符串 + 列表 + 字典",
    analogyTitle: "文章小助手",
    analogyBody: "对一段文字做统计：字符数、单词数、某个词出现次数，综合运用字符串方法。",
    concepts: [
      { term: "len(s)", desc: "字符数" },
      { term: "s.split()", desc: "拆单词" },
      { term: "s.count()", desc: "统计次数" }
    ],
    examples: [
      { title: "分析", code: "s = \"hello world\"\nprint(len(s))\nprint(len(s.split()))", output: "11\n2" }
    ],
    task: "分析一句话 s = \"hello world\"：先输出它有几个字符，再输出它有几个单词（分两行）。",
    requireCode: "len\\s*\\(\\s*s|split",
    requireMsg: "用 len(s) 数、split 拆单词再数。",
    initialCode: "s = \"hello world\"\n# 在这里写代码\n",
    answer: "print(len(s))\nprint(len(s.split()))",
    expected: "11\n2",
    hints: ["思路：len 字符数，split 拆单词再 len", "细节：句子含空格", "答案：print(len(s)); print(len(s.split()))"],
    exercises: [
      { tier: "热身", task: "句子 s=\"one two three\"，输出单词数", initialCode: "s = \"one two three\"\n# 写代码\n", expected: "3", answer: "print(len(s.split()))", hint: "先用 split 按空格把句子拆成单词，再数拆出来的列表长度。", requireCode: "split", requireMsg: "用 len(s.split())。" },
      { tier: "巩固", task: "句子 s=\"aab b aab\"，输出 \"aab\" 出现的次数", initialCode: "s = \"aab b aab\"\n# 写代码\n", expected: "2", answer: "print(s.count(\"aab\"))", hint: "字符串自带 count 方法，括号里写要统计的那个词，直接数整个句子里出现几次。", requireCode: "count\\s*\\(", requireMsg: "用 s.count(\"aab\")。" },
      { tier: "挑战", task: "句子 s=\"python is fun python\"，用字典统计每个单词次数，输出 \"python\" 的次数", initialCode: "s = \"python is fun python\"\n# 用字典统计", expected: "2", answer: "d = {}\nfor w in s.split():\n    d[w] = d.get(w, 0) + 1\nprint(d.get(\"python\", 0))", hint: "先 split 拆词，再用空字典累计每个单词的次数，最后取出目标词的那个值。", requireCode: "get\\s*\\(|d\\s*\\[", requireMsg: "用字典统计单词次数。" }
    ]
  },
  {
    id: "l3-16",
    eyebrow: "面向对象 · 继承",
    title: "类的继承",
    subtitle: "子类继承父类",
    analogyTitle: "子承父业",
    analogyBody: "继承像子承父业：子类(Dog) 自动拥有父类(Animal) 的方法，还能自己加新的。",
    concepts: [
      { term: "class 子类(父类)", desc: "继承父类" },
      { term: "继承的方法", desc: "子类可直接用父类方法" }
    ],
    examples: [
      { title: "继承", code: "class Animal:\n    def speak(self):\n        return \"叫\"\nclass Dog(Animal):\n    pass\nprint(Dog().speak())", output: "叫" }
    ],
    task: "让子类继承父类：先写一个父类 Animal（会「叫」），再写子类 Dog 继承它。造一只 Dog，让它叫一声并输出。",
    requireCode: "class\\s+Dog\\s*\\(\\s*Animal\\s*\\)",
    requireMsg: "子类继承父类：class Dog(Animal):。",
    initialCode: "# 在这里写代码\n",
    answer: "class Animal:\n    def speak(self):\n        return \"叫\"\nclass Dog(Animal):\n    pass\nprint(Dog().speak())",
    expected: "叫",
    hints: ["思路：子类(父类) 继承，会用父类方法", "细节：class Dog(Animal):", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "定义 Animal 类 eat() 返回\"吃东西\"，定义子类 Cat(Animal)，调用 Cat().eat() 并输出", initialCode: "# 写代码\n", expected: "吃东西", answer: "class Animal:\n    def eat(self):\n        return \"吃东西\"\nclass Cat(Animal):\n    pass\nprint(Cat().eat())", hint: "子类名后面的括号里写父类名，方法不用再写一遍，子类里放 pass 就行。", requireCode: "class\\s+Cat\\s*\\(\\s*Animal", requireMsg: "Cat 继承 Animal。" },
      { tier: "巩固", task: "定义 Animal 有 speak() 返回\"叫\"，子类 Dog 覆盖 speak() 返回\"汪\"，调用 Dog().speak() 并输出", initialCode: "# 写代码\n", expected: "汪", answer: "class Animal:\n    def speak(self):\n        return \"叫\"\nclass Dog(Animal):\n    def speak(self):\n        return \"汪\"\nprint(Dog().speak())", hint: "让 Dog 继承 Animal：类名后括号写父类，再把同名方法在子类里重新定义。", requireCode: "class\\s+Dog\\s*\\(\\s*Animal", requireMsg: "Dog 覆盖 speak 返回\"汪\"。" },
      { tier: "挑战", task: "定义 Animal 有 kind() 返回\"动物\"，子类 Cat 覆盖 kind() 返回\"猫\"，调用 Cat().kind() 并输出", initialCode: "# 写代码\n", expected: "猫", answer: "class Animal:\n    def kind(self):\n        return \"动物\"\nclass Cat(Animal):\n    def kind(self):\n        return \"猫\"\nprint(Cat().kind())", hint: "子类照旧在括号里写父类，然后在子类里重写父类那个方法，返回自己的结果。", requireCode: "class\\s+Cat\\s*\\(\\s*Animal", requireMsg: "Cat 覆盖 kind 返回\"猫\"。" }
    ]
  },
  {
    id: "l3-17",
    eyebrow: "综合项目 · 石头剪刀布",
    title: "判断石头剪刀布",
    subtitle: "函数 + 条件",
    analogyTitle: "比一比谁赢",
    analogyBody: "石头压剪刀、剪刀剪布、布包石头。写一个函数判断谁赢。",
    concepts: [
      { term: "def rps(me, you)", desc: "判断胜负的函数" },
      { term: "if/elif", desc: "按出拳规则判断" }
    ],
    examples: [
      { title: "石头赢剪刀", code: "def rps(me, you):\n    if (me == \"石头\" and you == \"剪刀\") or (me == \"剪刀\" and you == \"布\") or (me == \"布\" and you == \"石头\"):\n        return \"赢\"\n    elif me == you:\n        return \"平\"\n    else:\n        return \"输\"\nprint(rps(\"石头\", \"剪刀\"))", output: "赢" }
    ],
    task: "写一个石头剪刀布裁判，函数名 rps：给出双方出的拳，返回「赢」「输」或「平」。裁判一下：你出石头、对方出剪刀，输出结果。",
    requireCode: "def\\s+rps",
    requireMsg: "定义 rps(me,you)，按规则判断胜负。",
    initialCode: "# 在这里写代码\n",
    answer: "def rps(me, you):\n    if (me == \"石头\" and you == \"剪刀\") or (me == \"剪刀\" and you == \"布\") or (me == \"布\" and you == \"石头\"):\n        return \"赢\"\n    elif me == you:\n        return \"平\"\n    else:\n        return \"输\"\nprint(rps(\"石头\", \"剪刀\"))",
    expected: "赢",
    hints: ["思路：石头>剪刀、剪刀>布、布>石头", "细节：相同为平", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "调用 rps，输出 rps(\"剪刀\",\"布\")", initialCode: "def rps(me, you):\n    if (me == \"石头\" and you == \"剪刀\") or (me == \"剪刀\" and you == \"布\") or (me == \"布\" and you == \"石头\"):\n        return \"赢\"\n    elif me == you:\n        return \"平\"\n    else:\n        return \"输\"\n# 写代码\n", expected: "赢", answer: "print(rps(\"剪刀\", \"布\"))", hint: "rps 已经写好，调用时第一个参数是自己的出拳，第二个是对方的。", requireCode: "rps\\s*\\(", requireMsg: "调用 rps(\"剪刀\",\"布\")。" },
      { tier: "巩固", task: "调用 rps，输出 rps(\"布\",\"石头\")", initialCode: "def rps(me, you):\n    if (me == \"石头\" and you == \"剪刀\") or (me == \"剪刀\" and you == \"布\") or (me == \"布\" and you == \"石头\"):\n        return \"赢\"\n    elif me == you:\n        return \"平\"\n    else:\n        return \"输\"\n# 写代码\n", expected: "赢", answer: "print(rps(\"布\", \"石头\"))", hint: "还是按「自己、对方」的顺序传两个字符串，顺序写反结果就不对了。", requireCode: "rps\\s*\\(", requireMsg: "调用 rps(\"布\",\"石头\")。" },
      { tier: "挑战", task: "调用 rps，输出 rps(\"石头\",\"石头\")", initialCode: "def rps(me, you):\n    if (me == \"石头\" and you == \"剪刀\") or (me == \"剪刀\" and you == \"布\") or (me == \"布\" and you == \"石头\"):\n        return \"赢\"\n    elif me == you:\n        return \"平\"\n    else:\n        return \"输\"\n# 写代码\n", expected: "平", answer: "print(rps(\"石头\", \"石头\"))", hint: "调用时两个参数相同，函数会走到平局那一支；记得两边都写成同样的字符串。", requireCode: "rps\\s*\\(", requireMsg: "调用 rps(\"石头\",\"石头\")，相同为平。" }
    ]
  },
  {
    id: "l3-18",
    eyebrow: "综合项目 · 三角形",
    title: "量出三边，再判断三角形形状",
    subtitle: "坐标 → 距离 → sorted → 判断",
    analogyTitle: "先量三边，再让它们排队",
    analogyBody: "知道三个顶点的坐标，就能用两点距离公式量出三条边。把三边从短到长排好队之后，判断变得极简单：最短两条相等就是等腰，三条都相等就是等边。不排序的话，你得把 6 种排列组合全写一遍，累死还容易漏。",
    concepts: [
      { term: "两点距离", desc: "d = √((x2-x1)² + (y2-y1)²)，用 math.sqrt 开方" },
      { term: "sorted(三边)", desc: "把三边从小到大排好，比较才省事" },
      { term: "abs(a-b) < 1e-9", desc: "开方得到的是小数，不能用 == 精确比较，要留容差" }
    ],
    examples: [
      { title: "量一条边", code: "import math\nx1, y1 = 0, 0\nx2, y2 = 3, 0\nd = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\nprint(d)", output: "3.0" },
      { title: "三边排好队", code: "sides = sorted([4.0, 3.0, 5.0])\nprint(sides)", output: "[3.0, 4.0, 5.0]" },
      { title: "为什么不能用 ==", code: "import math\nc = math.sqrt(5)\nprint(c * c == 5)\nprint(abs(1 + 4 - c * c) < 1e-9)", output: "False\nTrue" }
    ],
    task: "三个顶点的坐标由 6 次 input() 依次给出：x1 y1 x2 y2 x3 y3（点「运行」会自动替你输入 0 0 3 0 0 4，也就是 A(0,0)、B(3,0)、C(0,4)）。算出三条边、用 sorted 从小到大排好，然后判断形状并输出：等边三角形 / 等腰三角形 / 直角三角形 / 普通三角形（按这个先后顺序判断）。",
    requireCode: "sorted\\s*\\(",
    requireMsg: "请用 sorted() 把三条边排好序再判断——排好队之后比较逻辑最简单。",
    initialCode: "import math\n# 依次读入 6 个坐标（每个 input 读一个数）\n",
    answer: "import math\n\nx1 = float(input()); y1 = float(input())\nx2 = float(input()); y2 = float(input())\nx3 = float(input()); y3 = float(input())\n\nab = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\nbc = math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2)\nca = math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2)\n\na, b, c = sorted([ab, bc, ca])\n\nif abs(a - b) < 1e-9 and abs(b - c) < 1e-9:\n    print(\"等边三角形\")\nelif abs(a - b) < 1e-9 or abs(b - c) < 1e-9:\n    print(\"等腰三角形\")\nelif abs(a * a + b * b - c * c) < 1e-9:\n    print(\"直角三角形\")\nelse:\n    print(\"普通三角形\")",
    expected: "直角三角形",
    inputs: ["0", "0", "3", "0", "0", "4"],
    hints: [
      "思路：先用两点距离公式算出 ab、bc、ca 三条边，再 sorted 排序，最后从小到大比较",
      "细节：开方得到的是小数，别用 == 比，要用 abs(差) < 1e-9；排好序后最短的两条相等就是等腰",
      "答案：sorted 排三边 → 先比 a==b==c（等边），再比 a==b 或 b==c（等腰），再比 a*a+b*b==c*c（直角）"
    ],
    exercises: [
      { tier: "热身", task: "已知三条边是 5、5、3。用 sorted 把它们从小到大排好并输出", initialCode: "# 写代码\n", expected: "[3, 5, 5]", answer: "print(sorted([5, 5, 3]))", hint: "sorted() 直接把整个列表排好并返回新列表，不用自己写比较。", requireCode: "sorted\\s*\\(", requireMsg: "用 sorted([5, 5, 3])。" },
      { tier: "巩固", task: "三点坐标 A(0,0)、B(4,0)、C(2,3)，依次用 6 次 input() 读入（会自动输入 0 0 4 0 2 3）。算出三边、排序并输出形状", initialCode: "import math\n# 读入 6 个坐标\n", inputs: ["0", "0", "4", "0", "2", "3"], expected: "等腰三角形", answer: "import math\nx1=float(input()); y1=float(input())\nx2=float(input()); y2=float(input())\nx3=float(input()); y3=float(input())\nab=math.sqrt((x2-x1)**2+(y2-y1)**2)\nbc=math.sqrt((x3-x2)**2+(y3-y2)**2)\nca=math.sqrt((x1-x3)**2+(y1-y3)**2)\na,b,c=sorted([ab,bc,ca])\nif abs(a-b)<1e-9 and abs(b-c)<1e-9: print(\"等边三角形\")\nelif abs(a-b)<1e-9 or abs(b-c)<1e-9: print(\"等腰三角形\")\nelif abs(a*a+b*b-c*c)<1e-9: print(\"直角三角形\")\nelse: print(\"普通三角形\")", hint: "三边里 AC 和 BC 都是 √13，排好序后最短两条相等 → 等腰。（比较一定要用 abs(差) < 1e-9。）", requireCode: "sorted\\s*\\(", requireMsg: "记得用 sorted() 排序。" },
      { tier: "挑战", task: "三点坐标 A(0,0)、B(2,0)、C(0,1)，依次用 6 次 input() 读入（会自动输入 0 0 2 0 0 1）。输出形状。（提示：这条最关键的判断，用 == 会失败）", initialCode: "import math\n# 读入 6 个坐标\n", inputs: ["0", "0", "2", "0", "0", "1"], expected: "直角三角形", answer: "import math\nx1=float(input()); y1=float(input())\nx2=float(input()); y2=float(input())\nx3=float(input()); y3=float(input())\nab=math.sqrt((x2-x1)**2+(y2-y1)**2)\nbc=math.sqrt((x3-x2)**2+(y3-y2)**2)\nca=math.sqrt((x1-x3)**2+(y1-y3)**2)\na,b,c=sorted([ab,bc,ca])\nif abs(a-b)<1e-9 and abs(b-c)<1e-9: print(\"等边三角形\")\nelif abs(a-b)<1e-9 or abs(b-c)<1e-9: print(\"等腰三角形\")\nelif abs(a*a+b*b-c*c)<1e-9: print(\"直角三角形\")\nelse: print(\"普通三角形\")", hint: "三边是 1、2、√5。1²+2² 理论上是 5，但 (√5)² 算出来是 5.000000000000001 —— 用 == 就判成普通三角形了，必须用 abs(差) < 1e-9。", requireCode: "sorted\\s*\\(", requireMsg: "记得用 sorted() 排序。" }
    ]
  },
  {
    id: "l4-1",
    eyebrow: "zip 配对",
    title: "用 zip 把两份数据配对",
    subtitle: "zip(列表1, 列表2)",
    analogyTitle: "给袜子配对",
    analogyBody: "zip 像把两排袜子一一配对：zip(names, ages) 把名字和年龄按同一位置配成一对。",
    concepts: [
      { term: "zip(a, b)", desc: "把两个列表按位置配对" },
      { term: "for x, y in zip(..)", desc: "同时遍历两个值" }
    ],
    examples: [
      { title: "配对", code: "for x, y in zip([\"a\",\"b\"], [1, 2]):\n    print(x, y)", output: "a 1\nb 2" }
    ],
    task: "把两份数据一一配对。用 zip 把 [\"a\",\"b\"] 和 [1,2] 配对，逐行输出 a 1 和 b 2。",
    requireCode: "zip\\s*\\(",
    requireMsg: "用 zip(a, b) 配对，for x,y in zip(...) 遍历。",
    initialCode: "# 在这里写代码\n",
    answer: "for x, y in zip([\"a\",\"b\"], [1, 2]):\n    print(x, y)",
    expected: "a 1\nb 2",
    hints: ["思路：zip 按位置配对", "细节：for 里同时取两个变量", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 zip 把 [\"x\",\"y\"] 和 [10,20] 配对，逐行输出", initialCode: "# 写代码\n", expected: "x 10\ny 20", answer: "for a, b in zip([\"x\",\"y\"], [10,20]): print(a, b)", hint: "zip 会把两份列表按位置一一配对，循环里得用两个变量同时接住左边的词和右边的数，再逐行输出。", requireCode: "zip\\s*\\(", requireMsg: "用 zip 配对。" },
      { tier: "巩固", task: "用 zip 把 [1,2] 和 [3,4] 配对，输出每对的和", initialCode: "# 写代码\n", expected: "4\n6", answer: "for a, b in zip([1,2], [3,4]): print(a + b)", hint: "先用 zip 把两个列表配对，循环里拿到每对的两个数，当场相加后再逐个输出结果。", requireCode: "zip\\s*\\(", requireMsg: "配对后相加。" },
      { tier: "挑战", task: "用 zip 把 [\"apple\",\"banana\"] 和 [3,5] 配对，输出 \"apple:3\" 和 \"banana:5\"", initialCode: "# 写代码\n", expected: "apple:3\nbanana:5", answer: "for n, v in zip([\"apple\",\"banana\"], [3,5]): print(str(n) + \":\" + str(v))", hint: "zip 配对后一次拿到词和数字，输出时要用冒号连起来，注意数字得先转成字符串才能和词拼接。", requireCode: "zip\\s*\\(", requireMsg: "配对后拼接输出。" }
    ]
  },
  {
    id: "l4-2",
    eyebrow: "自定义排序",
    title: "按自己的规则排序",
    subtitle: "sorted(列表, key=函数)",
    analogyTitle: "按身高排队",
    analogyBody: "sorted 默认从小到大；用 key 指定指标（如按长度、按绝对值），就能按自己的规则排。",
    concepts: [
      { term: "sorted(列表, key=len)", desc: "按长度排序" },
      { term: "key 函数", desc: "指定排序依据" }
    ],
    examples: [
      { title: "按长度排", code: "print(sorted([\"banana\",\"apple\",\"pear\"], key=len))", output: "['pear', 'apple', 'banana']" }
    ],
    task: "按自己的规则排序：把 [\"banana\",\"apple\",\"pear\"] 按「长度」从小到大排好并输出（提示：sorted 的 key 参数可以用 len）。",
    requireCode: "key\\s*=",
    requireMsg: "用 sorted(列表, key=len) 按长度排序。",
    initialCode: "# 在这里写代码\n",
    answer: "print(sorted([\"banana\",\"apple\",\"pear\"], key=len))",
    expected: "['pear', 'apple', 'banana']",
    hints: ["思路：sorted 加 key=len 按长度排", "细节：key 指定排序依据", "答案：sorted([...], key=len)"],
    exercises: [
      { tier: "热身", task: "对 [3,-1,2] 按绝对值排序并输出", initialCode: "# 写代码\n", expected: "[-1, 2, 3]", answer: "print(sorted([3,-1,2], key=abs))", hint: "sorted 的 key 参数决定按什么标准比大小，按绝对值排就把 abs 这个名字交给它。", requireCode: "key=\\s*abs|key=\\s*abs", requireMsg: "sorted([...], key=abs)。" },
      { tier: "巩固", task: "对 [\"bb\",\"a\",\"ccc\"] 按长度升序输出", initialCode: "# 写代码\n", expected: "['a', 'bb', 'ccc']", answer: "print(sorted([\"bb\",\"a\",\"ccc\"], key=len))", hint: "想让短词排前面，就把 key 设成 len，让 sorted 先比较长度而不是字母顺序。", requireCode: "key\\s*=", requireMsg: "sorted(..., key=len)。" },
      { tier: "挑战", task: "对 [(2,3),(1,4)] 按第二个元素（lambda x:x[1]）排序并输出", initialCode: "# 写代码\n", expected: "[(2, 3), (1, 4)]", answer: "print(sorted([(2,3),(1,4)], key=lambda x: x[1]))", hint: "元组默认按第一项比大小；要按第二项排，key 得写一个 lambda 把每一项的第二个元素取出来。", requireCode: "key\\s*=|lambda", requireMsg: "sorted(..., key=lambda x:x[1])。" }
    ]
  },
  {
    id: "l4-3",
    eyebrow: "all / any",
    title: "判断「全部」和「任意」",
    subtitle: "all / any",
    analogyTitle: "全员通过 / 有人通过",
    analogyBody: "all 像「全员都要达标」，any 像「至少一个达标」。都返回 True/False。",
    concepts: [
      { term: "all(列表)", desc: "全部为真才 True" },
      { term: "any(列表)", desc: "任意一个为真就 True" }
    ],
    examples: [
      { title: "all 全正", code: "print(all(x > 0 for x in [1, 2, 3]))", output: "True" }
    ],
    task: "检查一队人是否全员达标。用 all 判断 [1,2,3] 是不是全部为正数，并输出结果（True 或 False）。",
    requireCode: "all\\s*\\(",
    requireMsg: "用 all(x>0 for x in 列表) 判断。",
    initialCode: "# 在这里写代码\n",
    answer: "print(all(x > 0 for x in [1, 2, 3]))",
    expected: "True",
    hints: ["思路：all 全部为真才真", "细节：生成器 all(x>0 for x in ...)", "答案：print(all(x>0 for x in [1,2,3]))"],
    exercises: [
      { tier: "热身", task: "判断 [1,-2,3] 是否任意一个为负数，用 any 输出", initialCode: "# 写代码\n", expected: "True", answer: "print(any(x < 0 for x in [1,-2,3]))", hint: "any 是「有一个满足就为真」，条件写成逐个判断是否小于零，最后会得到布尔值。", requireCode: "any\\s*\\(", requireMsg: "用 any(x<0 for x in ...)。" },
      { tier: "巩固", task: "判断 [2,4,6] 是否全部为偶数，用 all 输出", initialCode: "# 写代码\n", expected: "True", answer: "print(all(x % 2 == 0 for x in [2,4,6]))", hint: "all 要求全部满足才为真，条件写成对 2 取余为零，逐个检查每个数是不是偶数。", requireCode: "all\\s*\\(", requireMsg: "用 all(x%2==0 for x in ...)。" },
      { tier: "挑战", task: "用 any 判断列表 [0, [], \"\"] 里有没有「真值」，并输出结果。（提示：0、空列表、空字符串都算假）", initialCode: "# 写代码\n", expected: "False", answer: "print(any([0, [], \"\"]))", hint: "any 能直接接收整个列表判断真假，不必再写条件；记住 0、空列表、空字符串都算假。", requireCode: "any\\s*\\(", requireMsg: "any([0,[],\"\"]) 全为假 → False。" }
    ]
  },
  {
    id: "l4-4",
    eyebrow: "异常细化",
    title: "捕获特定错误",
    subtitle: "except 类型",
    analogyTitle: "分类接住",
    analogyBody: "except 后面可以写错误类型，只接住那一类：except ValueError 接值错误、except ZeroDivisionError 接除零。",
    concepts: [
      { term: "except ValueError:", desc: "接值错误" },
      { term: "except ZeroDivisionError:", desc: "接除零错误" }
    ],
    examples: [
      { title: "接 ValueError", code: "try:\n    int(\"abc\")\nexcept ValueError:\n    print(\"输入非法\")", output: "输入非法" }
    ],
    task: "只接住特定的一种错误：把 \"abc\" 转成整数必定失败，请只捕获这一类错误（ValueError），出错时输出：输入非法",
    requireCode: "except\\s+ValueError",
    requireMsg: "用 except ValueError: 捕获值转换错误。",
    initialCode: "# 在这里写代码\n",
    answer: "try:\n    int(\"abc\")\nexcept ValueError:\n    print(\"输入非法\")",
    expected: "输入非法",
    hints: ["思路：except 后面写错误类型", "细节：int(\"abc\") 抛 ValueError", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "用 try/except 捕获 ZeroDivisionError：5/0 出错打印\"不能除零\"", initialCode: "# 写代码\n", expected: "不能除零", answer: "try: print(5/0) except ZeroDivisionError: print(\"不能除零\")", hint: "把会出错的除法放进 try，except 后面要写准异常类型 ZeroDivisionError，出错才跳去打印提示。", requireCode: "ZeroDivisionError", requireMsg: "except ZeroDivisionError。" },
      { tier: "巩固", task: "用 try/except 捕获 TypeError：\"a\"+1 出错打印\"类型不对\"", initialCode: "# 写代码\n", expected: "类型不对", answer: "try: print(\"a\"+1) except TypeError: print(\"类型不对\")", hint: "字符串和数字相加会抛 TypeError，except 要写这个类型名才接得住，接住后再输出那句提示。", requireCode: "TypeError", requireMsg: "except TypeError。" },
      { tier: "挑战", task: "用 try/except 捕获 IndexError：取出 [1,2][5] 出错打印\"越界\"", initialCode: "# 写代码\n", expected: "越界", answer: "try: print([1,2][5]) except IndexError: print(\"越界\")", hint: "下标超出范围抛的是 IndexError，except 后面写准这个类型，才能接住越界错误并输出提示。", requireCode: "IndexError", requireMsg: "except IndexError。" }
    ]
  },
  {
    id: "l4-5",
    eyebrow: "map 与 lambda",
    title: "用 map 批量加工",
    subtitle: "map(函数, 列表)",
    analogyTitle: "流水线加工",
    analogyBody: "map 像一条流水线：把列表每个元素交给一个函数加工，得到新列表。lambda 是「造一个匿名小函数」。",
    concepts: [
      { term: "map(函数, 列表)", desc: "对每个元素做加工" },
      { term: "lambda x: 表达式", desc: "匿名函数" }
    ],
    examples: [
      { title: "平方", code: "print(list(map(lambda x: x*x, [1, 2, 3])))", output: "[1, 4, 9]" }
    ],
    task: "批量加工数据。用 map 把 [1,2,3] 每个数平方，转成列表并输出。",
    requireCode: "map\\s*\\(",
    requireMsg: "用 map(函数, 列表) 加工，list() 转列表。",
    initialCode: "# 在这里写代码\n",
    answer: "print(list(map(lambda x: x * x, [1, 2, 3])))",
    expected: "[1, 4, 9]",
    hints: ["思路：map 把每个元素交给 lambda 加工", "细节：list() 把结果转列表", "答案：list(map(lambda x:x*x, [1,2,3]))"],
    exercises: [
      { tier: "热身", task: "用 map 把 [1,2,3] 每个加 10，转列表输出", initialCode: "# 写代码\n", expected: "[11, 12, 13]", answer: "print(list(map(lambda x: x+10, [1,2,3])))", hint: "map 负责把每个元素加工一遍，加工规则用 lambda 写；它返回迭代器，要再包一层列表才看得到。", requireCode: "map\\s*\\(", requireMsg: "map(lambda x:x+10,...)。" },
      { tier: "巩固", task: "用 map 把 [1,2,3] 每个转成字符串，转列表输出", initialCode: "# 写代码\n", expected: "['1', '2', '3']", answer: "print(list(map(str, [1,2,3])))", hint: "这题不用 lambda，直接把内置函数名 str 交给 map 当加工规则，最后再转成列表。", requireCode: "map\\s*\\(", requireMsg: "map(str, 列表)。" },
      { tier: "挑战", task: "用 map 把 [\"a\",\"b\"] 每个转大写，转列表输出", initialCode: "# 写代码\n", expected: "['A', 'B']", answer: "print(list(map(str.upper, [\"a\",\"b\"])))", hint: "字符串自带 upper 方法，可以把这个方法名直接交给 map，省掉自己写 lambda。", requireCode: "map\\s*\\(", requireMsg: "map(str.upper, 列表)。" }
    ]
  },
  {
    id: "l4-6",
    eyebrow: "enumerate",
    title: "遍历时带下标",
    subtitle: "for i, x in enumerate(列表)",
    analogyTitle: "编号的清单",
    analogyBody: "enumerate 像给清单每一项编个号：for i, x in enumerate(列表) 同时拿到「第几项」和「内容」。",
    concepts: [
      { term: "enumerate(列表)", desc: "遍历时带下标" },
      { term: "for i, x in enumerate", desc: "同时取下标和值" }
    ],
    examples: [
      { title: "带编号", code: "for i, x in enumerate([\"a\", \"b\"]):\n    print(i, x)", output: "0 a\n1 b" }
    ],
    task: "给清单每项编个号。用 enumerate 遍历 [\"a\",\"b\"]，把编号和内容一起输出，两行分别是 0 a 和 1 b。",
    requireCode: "enumerate\\s*\\(",
    requireMsg: "用 for i, x in enumerate(列表) 遍历。",
    initialCode: "# 在这里写代码\n",
    answer: "for i, x in enumerate([\"a\", \"b\"]):\n    print(i, x)",
    expected: "0 a\n1 b",
    hints: ["思路：enumerate 同时给下标", "细节：i 从 0 开始", "答案：for i,x in enumerate([...]): print(i,x)"],
    exercises: [
      { tier: "热身", task: "用 enumerate 遍历 [\"x\",\"y\"], 输出 0 x 和 1 y", initialCode: "# 写代码\n", expected: "0 x\n1 y", answer: "for i,x in enumerate([\"x\",\"y\"]): print(i,x)", hint: "enumerate 一次给出「第几项」和「内容」两个值，循环里用两个变量接住，编号默认从 0 起。", requireCode: "enumerate\\s*\\(", requireMsg: "enumerate 带下标。" },
      { tier: "巩固", task: "用 enumerate 从下标 1 开始编号遍历 [\"a\",\"b\"], 输出 1 a 和 2 b", initialCode: "# 写代码\n", expected: "1 a\n2 b", answer: "for i,x in enumerate([\"a\",\"b\"], 1): print(i,x)", hint: "enumerate 的第二个参数能指定起始编号，想从 1 开始数就把它填进去。", requireCode: "enumerate\\s*\\(", requireMsg: "enumerate(列表, 1)。" },
      { tier: "挑战", task: "用 enumerate 遍历 [10, 20, 30]，输出三行：第0项是10、第1项是20、第2项是30", initialCode: "# 写代码\n", expected: "第0项是10\n第1项是20\n第2项是30", answer: "for i,x in enumerate([10,20,30]): print(\"第\" + str(i) + \"项是\" + str(x))", hint: "要拼出「第几项是几」，数字必须先转成字符串，再用加号跟前后文字粘在一起。", requireCode: "enumerate\\s*\\(", requireMsg: "enumerate 拼接输出。" }
    ]
  },
  {
    id: "l4-7",
    eyebrow: "filter",
    title: "用 filter 筛选",
    subtitle: "filter(条件, 列表)",
    analogyTitle: "筛子",
    analogyBody: "filter 像筛子：只留下满足条件的元素。list(filter(函数, 列表)) 得到筛后的列表。",
    concepts: [
      { term: "filter(函数, 列表)", desc: "只留下满足条件的" },
      { term: "lambda 条件", desc: "匿名条件函数" }
    ],
    examples: [
      { title: "筛偶数", code: "print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))", output: "[2, 4]" }
    ],
    task: "从一堆数里筛出想要的。用 filter 筛出 [1,2,3,4] 里的偶数，转成列表并输出。",
    requireCode: "filter\\s*\\(",
    requireMsg: "用 filter(lambda 条件, 列表) 筛，list() 转列表。",
    initialCode: "# 在这里写代码\n",
    answer: "print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))",
    expected: "[2, 4]",
    hints: ["思路：filter 只留满足条件的", "细节：list() 转列表", "答案：list(filter(lambda x:x%2==0, [1,2,3,4]))"],
    exercises: [
      { tier: "热身", task: "用 filter 筛出 [1,2,3,4,5] 的大于 3 的数，转列表输出", initialCode: "# 写代码\n", expected: "[4, 5]", answer: "print(list(filter(lambda x: x > 3, [1,2,3,4,5])))", hint: "filter 只留下条件为真的元素，条件用 lambda 写成判断大于 3，结果是迭代器记得转列表。", requireCode: "filter\\s*\\(", requireMsg: "filter(lambda x:x>3,...)。" },
      { tier: "巩固", task: "用 filter 筛出 [\"a\",\"\",\"b\"] 的非空字符串（非空为真），转列表输出", initialCode: "# 写代码\n", expected: "['a', 'b']", answer: "print(list(filter(None, [\"a\",\"\",\"b\"])))", hint: "不写条件时给 filter 传 None，它会按元素自身的真假筛选，空字符串会被当成假丢掉。", requireCode: "filter\\s*\\(", requireMsg: "filter(None, 列表) 去空。" },
      { tier: "挑战", task: "用 filter 筛出 [3,6,9,12] 能被 4 整除的数，转列表输出", initialCode: "# 写代码\n", expected: "[12]", answer: "print(list(filter(lambda x: x % 4 == 0, [3,6,9,12])))", hint: "条件写成 lambda 里判断对 4 取余是否为零，filter 负责剔除不合格的元素，最后转成列表。", requireCode: "filter\\s*\\(", requireMsg: "filter(lambda x:x%4==0,...)。" }
    ]
  },
  {
    id: "l4-8",
    eyebrow: "数据分析综合",
    title: "数据分析：词频排行",
    subtitle: "字典 + sorted",
    analogyTitle: "统计谁能上榜",
    analogyBody: "统计每个词出现次数，找出出现最多的几个——像榜单，综合字典、统计、排序。",
    concepts: [
      { term: "d.get(w,0)+1", desc: "统计词频" },
      { term: "sorted(d.items(), key)", desc: "按次数排序" }
    ],
    examples: [
      { title: "词频", code: "d = {}\nfor w in \"a b a c a\".split():\n    d[w] = d.get(w, 0) + 1\nprint(max(d, key=d.get))", output: "a" }
    ],
    task: "找出出现最多的词。句子 s = \"a b a c a\"：用字典统计每个词的出现次数，然后输出出现最多的那个词。",
    requireCode: "max\\s*\\(|d\\s*\\.get|\\.get\\s*\\(",
    requireMsg: "用字典统计后 max(d, key=d.get) 找最多。",
    initialCode: "s = \"a b a c a\"\n# 用字典统计\n",
    answer: "d = {}\nfor w in s.split():\n    d[w] = d.get(w, 0) + 1\nprint(max(d, key=d.get))",
    expected: "a",
    hints: ["思路：字典统计词频，再取最多的键", "细节：max(d, key=d.get)", "答案：见示例"],
    exercises: [
      { tier: "热身", task: "统计 \"x y x\" 每个词次数，输出出现最多的词", initialCode: "s = \"x y x\"\n# 用字典统计\n", expected: "x", answer: "d={}\nfor w in s.split(): d[w]=d.get(w,0)+1\nprint(max(d, key=d.get))", hint: "先 split 拆出词，遍历时用字典的 .get 取不到就给默认值 0 再累加次数；最后按计数值取最大的键。", requireCode: "\\.get\\s*\\(", requireMsg: "字典统计后取最多。" },
      { tier: "巩固", task: "统计 \"a a b c c c\" 每个词次数，输出出现最多的词", initialCode: "s = \"a a b c c c\"\n# 用字典统计\n", expected: "c", answer: "d={}\nfor w in s.split(): d[w]=d.get(w,0)+1\nprint(max(d, key=d.get))", hint: "先按空格拆词，遍历时把每个词在字典里累加计数，再按计数值挑出出现次数最多的那个词。", requireCode: "\\.get\\s*\\(", requireMsg: "字典统计后取最多。" },
      { tier: "挑战", task: "统计 \"a b a c b a\" 每个词次数，输出按次数降序的「词:次数」第一行（用 sorted）", initialCode: "s = \"a b a c b a\"\n# 用字典+排序\n", expected: "a:3", answer: "d = {}\nfor w in s.split():\n    d[w] = d.get(w, 0) + 1\npairs = sorted(d.items(), key=lambda kv: kv[1], reverse=True)\nprint(str(pairs[0][0]) + \":\" + str(pairs[0][1]))", hint: "词频统计完，用 sorted 对字典的 items 按次数降序排（key 取次数、reverse=True），取第一项，再用冒号把词和次数拼起来。", requireCode: "\\.get\\s*\\(", requireMsg: "取最多的词和次数。" }
    ]
  }
];
