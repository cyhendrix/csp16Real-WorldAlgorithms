const lessons = [
  {
    title:'Lesson 1 — Algorithm Efficiency', subtitle:'Big O notation and reasonable versus unreasonable algorithms',
    questions:[
      {title:'What Does n Mean?',prompt:'In Big O notation, what does n usually represent?',highlight:['Big O'],options:['The number of input elements','The name of the computer','The number of programmers','The exact time in seconds'],answer:0,feedback:'n represents the size of the problem or the number of input elements.'},
      {title:'Linear Growth',prompt:'Which Big O expression describes linear efficiency?',options:['O(n)','O(n²)','O(2ⁿ)','O(n!)'],answer:0,feedback:'O(n) grows in proportion to the number of elements.'},
      {title:'Reasonable Algorithms',prompt:'Which algorithm is generally considered unreasonable for large inputs because its work grows exponentially?',options:['O(2ⁿ)','O(n)','O(n²)','O(1)'],answer:0,feedback:'Exponential growth O(2ⁿ) becomes impractical much faster than linear or polynomial growth.'},
      {title:'Compare Work',prompt:'If n = 10, about how many units of work does O(n²) represent?',code:'n = 10\nwork = n * n',options:['100','10','20','1,000'],answer:0,feedback:'n² = 10 × 10 = 100.'}
    ],
    coding:{title:'Coding Scenario — Compare Algorithm Growth',scenario:'Estimate how much work linear and quadratic algorithms do for the same number of items. Print the linear count, then print the quadratic count.',requirements:['Start with the items variable.','Set linearWork equal to items.','Set quadraticWork equal to items multiplied by itself.','Print linearWork and then quadraticWork on separate lines.'],starter:'items = 10\n# Calculate and print both work estimates below',checks:[{label:'uses the items variable',test:c=>/\bitems\b/.test(c)},{label:'calculates linearWork',test:c=>/\blinearWork\s*=/.test(c)},{label:'calculates quadraticWork using multiplication',test:c=>/\bquadraticWork\s*=.*\*/.test(c)},{label:'prints both estimates',test:c=>(c.match(/\bprint\s*\(/g)||[]).length>=2}]}
  },
  {
    title:'Lesson 2 — Undecidable Problems', subtitle:'Problem types, decidability, and when an algorithm cannot guarantee an answer',
    questions:[
      {title:'Define a Problem',prompt:'A complete description of a computing problem identifies what?',options:['Expected inputs and outputs','Only the programming language','Only how fast the computer runs','The programmer’s name'],answer:0,feedback:'A problem definition describes its expected inputs and outputs.'},
      {title:'Decision Problem',prompt:'What kind of answer does a decision problem request?',options:['Yes/No or True/False','A list of every possible solution','Only a graph','A random paragraph'],answer:0,feedback:'Decision problems ask questions that can be answered yes/no or True/False.'},
      {title:'Optimization Problem',prompt:'Which question is an optimization problem?',options:['Which schedule finishes the project in the least time?','Is 15 between 10 and 20?','What is 5 + 6?','What letter appears first in a word?'],answer:0,feedback:'Optimization asks for the best solution among alternatives.'},
      {title:'Undecidable Problems',prompt:'What makes a problem undecidable?',options:['No algorithm can always produce the required correct answer for every possible input','It uses more than one variable','Its answer is always False','A slow computer is used'],answer:0,feedback:'For an undecidable problem, no general algorithm is guaranteed to produce the correct answer for every input.'}
    ],
    coding:{title:'Coding Scenario — A Decision Problem',scenario:'Create a decision algorithm: given number, print Yes when the number is from 10 through 20, inclusive, and No otherwise.',requirements:['Use the existing number variable.','Use an if / else decision.','Check both the lower and upper limits.','Print exactly Yes or No.'],starter:'number = 15\n# Write your decision algorithm below',checks:[{label:'checks number against 10',test:c=>/10/.test(c)},{label:'checks number against 20',test:c=>/20/.test(c)},{label:'uses if and else',test:c=>/\bif\b/.test(c)&&/\belse\s*:/.test(c)},{label:'prints a result',test:c=>/print\s*\(/.test(c)}]}
  },
  {
    title:'Lesson 3 — Simulations', subtitle:'Models, abstraction, accuracy, and limitations of computer simulations',
    questions:[
      {title:'What Is a Simulation?',prompt:'A computer simulation is best described as what?',options:['A model of a real-world process or event','A guaranteed prediction of the future','A computer with no inputs','A replacement for all real-world testing'],answer:0,feedback:'Simulations model real processes and help explore possible results.'},
      {title:'Simulation as Abstraction',prompt:'Why must most computer simulations simplify the real world?',options:['They cannot include every real-world variable and detail','Real-world processes never change','Models always use incorrect math','They do not need any data'],answer:0,feedback:'A useful model chooses important factors and leaves out some real-world complexity.'},
      {title:'Deck of Cards',prompt:'A card simulator chooses each card randomly but never removes dealt cards. What can go wrong?',options:['The same exact card could be dealt twice','The computer cannot print card names','It can only draw red cards','It will always choose five different cards'],answer:0,feedback:'A realistic deck simulation must remove a card after dealing it so it cannot appear again.'},
      {title:'Improving Accuracy',prompt:'How can scientists improve a computer simulation?',options:['Compare predictions with real observations and adjust the model','Ignore all observed results','Always add random numbers','Remove all input data'],answer:0,feedback:'Scientists validate models against observations, refine assumptions, and run the simulation again.'}
    ],
    coding:{title:'Coding Scenario — Simple Rain Simulation',scenario:'Build a simplified weather simulation. If the randomRoll value is less than or equal to rainChance, print Rain; otherwise print No rain. The roll is provided so your results can be checked.',requirements:['Use the rainChance and randomRoll variables.','Use if and else.','Compare randomRoll to rainChance.','Print exactly Rain or No rain.'],starter:'rainChance = 60\nrandomRoll = 40\n# Write the simulation decision below',checks:[{label:'uses rainChance and randomRoll',test:c=>/\brainChance\b/.test(c)&&/\brandomRoll\b/.test(c)},{label:'uses an if / else decision',test:c=>/\bif\b/.test(c)&&/\belse\s*:/.test(c)},{label:'uses a comparison',test:c=>/<=|>=|<|>/.test(c)},{label:'prints a result',test:c=>/print\s*\(/.test(c)}]}
  }
];

let currentLesson=0;
const chapter16PageKey='csp16-current-lesson';
try{
 const savedPage=Number(localStorage.getItem(chapter16PageKey));
 if(Number.isInteger(savedPage)&&savedPage>=0&&savedPage<=lessons.length)currentLesson=savedPage;
}catch(e){}

const answers=lessons.map(l=>Array(l.questions.length).fill(null));
const questionCorrect=lessons.map(l=>Array(l.questions.length).fill(false));
const questionAttempts=lessons.map(l=>Array(l.questions.length).fill(0));
const codingChecked=Array(lessons.length).fill(false);
const codingPassed=Array(lessons.length).fill(false);
const codeEntries=Array(lessons.length).fill('');
const chapter16ProgressKey='csp16-saved-progress-v1';
function saveProgress(){
 localStorage.setItem(chapter16ProgressKey,JSON.stringify({answers,questionCorrect,questionAttempts,codingChecked,codingPassed,codeEntries,optionOrders}));
}
function restoreProgress(){
 try{
  const p=JSON.parse(localStorage.getItem(chapter16ProgressKey)||'null');
  if(!p)return;
  lessons.forEach((lesson,i)=>{
   lesson.questions.forEach((q,qi)=>{
    const a=p.answers?.[i]?.[qi];
    if(Number.isInteger(a)&&a>=0&&a<q.options.length)answers[i][qi]=a;
    questionCorrect[i][qi]=answers[i][qi]===q.answer&&p.questionCorrect?.[i]?.[qi]===true;
    questionAttempts[i][qi]=Math.min(2,Math.max(0,Number(p.questionAttempts?.[i]?.[qi])|| (questionCorrect[i][qi]?1:0)));
    if(questionAttempts[i][qi]===0&&answers[i][qi]!==null)questionAttempts[i][qi]=1;
   });
   codeEntries[i]=typeof p.codeEntries?.[i]==='string'?p.codeEntries[i]:'';
   codingChecked[i]=p.codingChecked?.[i]===true;
   codingPassed[i]=codingChecked[i]&&p.codingPassed?.[i]===true;
   const order=p.optionOrders?.[i];
   if(Array.isArray(order)&&order.length===lesson.questions.length&&order.every((o,qi)=>Array.isArray(o)&&o.length===lesson.questions[qi].options.length&&new Set(o.map(v=>v.originalIndex)).size===o.length))optionOrders[i]=order;
  });
 }catch(e){}
}
const lessonView=document.getElementById('lessonView');
const lessonTabs=document.getElementById('lessonTabs');
const progressText=document.getElementById('progressText');
const progressBar=document.getElementById('progressBar');
const finishCard=document.getElementById('finishCard');

function escapeHtml(str){return str.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}
function highlightPrompt(text,words=[]){let safe=escapeHtml(text);words.forEach(word=>{const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');safe=safe.replace(new RegExp(`\\b(${escaped})\\b`,'gi'),'<span class="keyword-highlight">$1</span>')});return safe;}
function shuffleArray(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function makeOptionOrders(){return lessons.map(l=>l.questions.map(q=>shuffleArray(q.options.map((text,originalIndex)=>({text,originalIndex})))));}
let optionOrders=makeOptionOrders();
restoreProgress();
function lessonReady(i){return questionAttempts[i].every(n=>n>=2)||questionAttempts[i].every((n,qi)=>n>=2||questionCorrect[i][qi]) ? codingPassed[i] : false;}
function allLessonsReady(){return lessons.every((_,i)=>lessonReady(i));}

function renderTabs(){
 lessonTabs.innerHTML=lessons.map((l,i)=>`<button class="lesson-tab ${i===currentLesson?'active':''} ${lessonReady(i)?'done':''}" data-lesson="${i}">Lesson ${i+1}</button>`).join('')+`<button class="lesson-tab ${currentLesson===lessons.length?'active':''}" id="resultsTab" ${allLessonsReady()?'':'disabled'}>Results</button>`;
 document.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>{currentLesson=Number(b.dataset.lesson);render();window.scrollTo({top:0,behavior:'smooth'});}));document.getElementById('resultsTab').addEventListener('click',()=>{if(!allLessonsReady())return;currentLesson=lessons.length;render();window.scrollTo({top:0,behavior:'smooth'});});
}

function render(){
 localStorage.setItem(chapter16PageKey,String(currentLesson));
 if(currentLesson===lessons.length&&!allLessonsReady())currentLesson=lessons.findIndex((_,i)=>!lessonReady(i));renderTabs(); if(currentLesson===lessons.length){showFinish();return;} const lesson=lessons[currentLesson];
 progressText.textContent=`Lesson ${currentLesson+1} of ${lessons.length}`; progressBar.style.width=`${((currentLesson+1)/lessons.length)*100}%`; finishCard.classList.add('hidden');
 let html=`<section class="card lesson-header"><h2>${lesson.title}</h2><p class="lesson-subtitle">${lesson.subtitle}</p><p><strong>Multiple choice:</strong> You have two attempts per question. A correct answer finishes the question immediately; after two incorrect attempts, the question is marked complete.</p></section>`;
 lesson.questions.forEach((q,qi)=>{const shuffled=optionOrders[currentLesson][qi]; const done=questionCorrect[currentLesson][qi]||questionAttempts[currentLesson][qi]>=2;
   html+=`<article class="card question"><div class="qtop"><h2>Question ${qi+1}: ${q.title}</h2><span class="badge">Lesson ${currentLesson+1}</span></div><p class="prompt">${highlightPrompt(q.prompt,q.highlight||[])}</p>${q.code?`<div class="code">${escapeHtml(q.code)}</div>`:''}<div class="options">${shuffled.map(item=>`<button class="option ${questionCorrect[currentLesson][qi]&&item.originalIndex===q.answer?'correct':''}" data-q="${qi}" data-o="${item.originalIndex}" ${done?'disabled':''}>${escapeHtml(item.text)}</button>`).join('')}</div><div class="feedback ${done?'good':''}" id="feedback-${qi}">${done?(questionCorrect[currentLesson][qi]?'✓ Correct — '+q.feedback:'Two attempts used. Correct answer: '+q.options[q.answer]+'. '+q.feedback):''}</div></article>`;
 });
 const c=lesson.coding;
 html+=`<section class="card coding-card"><h2>${c.title}</h2><div class="scenario"><strong>Scenario:</strong> ${c.scenario}</div><b>Your program should:</b><ul class="requirements">${c.requirements.map(r=>`<li>${r}</li>`).join('')}</ul><div class="starter">${escapeHtml(c.starter)}</div><textarea class="code-entry" id="codeEntry" spellcheck="false" placeholder="Type your Python code here...">${escapeHtml(codeEntries[currentLesson])}</textarea><button class="primary" id="checkCodeBtn">Check My Code</button><div class="feedback" id="codeFeedback"></div><div id="codeResults"></div></section>`;
 html+=`<div class="lesson-actions">${currentLesson>0?'<button class="secondary" id="backBtn">Previous Lesson</button>':''}<button class="secondary" id="clearLessonBtn" type="button">Clear This Lesson</button><button class="next-btn" id="nextBtn" ${lessonReady(currentLesson)?'':'disabled'}>${currentLesson===lessons.length-1?'View Results':'Next Lesson'}</button></div>`;
 lessonView.innerHTML=html;
 document.querySelectorAll('.option').forEach(btn=>btn.addEventListener('click',checkQuestionImmediately));
 document.getElementById('codeEntry').addEventListener('input',e=>{codeEntries[currentLesson]=e.target.value;codingChecked[currentLesson]=false;codingPassed[currentLesson]=false;document.getElementById('nextBtn').disabled=true;saveProgress();renderTabs();});
 document.getElementById('checkCodeBtn').addEventListener('click',checkCode);
 const back=document.getElementById('backBtn');if(back)back.addEventListener('click',()=>{currentLesson--;render();window.scrollTo({top:0,behavior:'smooth'});});
 document.getElementById('nextBtn').addEventListener('click',nextLesson);document.getElementById('clearLessonBtn').addEventListener('click',clearCurrentLesson);
 if(codingChecked[currentLesson])displayCodeResults();
}

function checkQuestionImmediately(e){
 const qi=Number(e.currentTarget.dataset.q),oi=Number(e.currentTarget.dataset.o),q=lessons[currentLesson].questions[qi],fb=document.getElementById(`feedback-${qi}`),buttons=[...document.querySelectorAll(`[data-q="${qi}"]`)];
 if(questionCorrect[currentLesson][qi]||questionAttempts[currentLesson][qi]>=2)return;
 answers[currentLesson][qi]=oi;
 questionAttempts[currentLesson][qi]++;
 buttons.forEach(b=>b.classList.remove('selected','correct','incorrect'));
 if(oi===q.answer){
  questionCorrect[currentLesson][qi]=true;e.currentTarget.classList.add('correct');fb.className='feedback good';fb.textContent='✓ Correct — '+q.feedback;buttons.forEach(b=>b.disabled=true);
 }else if(questionAttempts[currentLesson][qi]>=2){
  e.currentTarget.classList.add('incorrect');fb.className='feedback bad';fb.textContent='Two attempts used. Correct answer: '+q.options[q.answer]+'. '+q.feedback;buttons.forEach(b=>b.disabled=true);
 }else{
  e.currentTarget.classList.add('incorrect');fb.className='feedback bad';fb.textContent='Not quite. You have one more attempt.';
 }
 saveProgress();updateNext();
}


let pythonRuntimePromise=null;
function loadPython(){
 if(pythonRuntimePromise)return pythonRuntimePromise;
 pythonRuntimePromise=new Promise((resolve,reject)=>{
  if(window.loadPyodide){resolve(window.loadPyodide());return;}
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js';
  script.onload=()=>window.loadPyodide().then(resolve,reject);
  script.onerror=()=>reject(new Error('Python engine could not load. Check your internet connection.'));
  document.head.appendChild(script);
 }).catch(e=>{pythonRuntimePromise=null;throw e});
 return pythonRuntimePromise;
}
const pythonTests=[
 [{items:10,expected:'10\n100'},{items:5,expected:'5\n25'},{items:20,expected:'20\n400'},{items:1,expected:'1\n1'}],
 [{number:15,expected:'Yes'},{number:9,expected:'No'},{number:21,expected:'No'},{number:10,expected:'Yes'},{number:20,expected:'Yes'}],
 [{rainChance:60,randomRoll:40,expected:'Rain'},{rainChance:30,randomRoll:75,expected:'No rain'},{rainChance:50,randomRoll:50,expected:'Rain'},{rainChance:0,randomRoll:99,expected:'No rain'}]
];
async function checkCode(){
 const lessonIndex=currentLesson,code=codeEntries[lessonIndex],button=document.getElementById('checkCodeBtn');
 const fb=document.getElementById('codeFeedback'),results=document.getElementById('codeResults');
 const checks=lessons[lessonIndex].coding.checks.map(ch=>({label:ch.label,pass:ch.test(code)}));
 button.disabled=true;fb.className='feedback';fb.textContent='Running your Python code and checking the answer key…';results.textContent='';
 try{
  const py=await loadPython();
  // A small AST-based runner prevents imports, file access, loops, and other
  // unrelated Python features while allowing the expressions in these lessons.
  const harness=String.raw`
import ast, json, io, contextlib
source = ${JSON.stringify(code)}
tests = json.loads(${JSON.stringify(JSON.stringify(pythonTests[lessonIndex]))})
allowed = (ast.Module,ast.Assign,ast.Name,ast.Store,ast.Load,ast.Constant,ast.Expr,
           ast.Call,ast.Compare,ast.Gt,ast.GtE,ast.Lt,ast.LtE,ast.Eq,ast.NotEq,
           ast.If,ast.BoolOp,ast.And,ast.Or,ast.Not,ast.UnaryOp,ast.USub,
           ast.BinOp,ast.Add,ast.Sub,ast.Mult,ast.Div,ast.Mod,ast.Tuple,
           ast.List,ast.Pass)
result = {"runs": [], "error": ""}
try:
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if not isinstance(node,allowed):
            raise ValueError("Only variables, comparisons, if/elif/else, and print() are allowed in this activity.")
        if isinstance(node,ast.Call) and (not isinstance(node.func,ast.Name) or node.func.id!="print"):
            raise ValueError("Only print() function calls are allowed in this activity.")
    for test in tests:
        class SetValues(ast.NodeTransformer):
            def visit_Assign(self,node):
                if len(node.targets)==1 and isinstance(node.targets[0],ast.Name):
                    name=node.targets[0].id
                    if name in test:
                        node.value=ast.Constant(value=test[name])
                return node
        test_tree=SetValues().visit(ast.parse(source))
        ast.fix_missing_locations(test_tree)
        output=io.StringIO()
        scope={"__builtins__":{"print":print}}
        with contextlib.redirect_stdout(output):
            exec(compile(test_tree,"<student>","exec"),scope,scope)
        actual=output.getvalue().strip()
        result["runs"].append({"expected":test["expected"],"actual":actual,
            "pass":actual==test["expected"],
            "inputs":{k:v for k,v in test.items() if k!="expected"}})
except Exception as exc:
    result["error"]=type(exc).__name__+": "+str(exc)
json.dumps(result)
`;
  const raw=await py.runPythonAsync(harness);
  if(currentLesson!==lessonIndex)return;
  const report=JSON.parse(raw),pass=!report.error&&checks.every(x=>x.pass)&&report.runs.length===pythonTests[lessonIndex].length&&report.runs.every(x=>x.pass);
  codingChecked[lessonIndex]=true;codingPassed[lessonIndex]=pass;
  const lines=checks.map(x=>'<div class="result-row">'+(x.pass?'✓':'○')+' '+escapeHtml(x.label)+'</div>');
  if(report.error)lines.push('<div class="result-row">Python error: '+escapeHtml(report.error)+'</div>');
  report.runs.forEach((run,i)=>{
   lines.push('<div class="result-row"><strong>Test '+(i+1)+': '+(run.pass?'✓ Passed':'✗ Needs correction')+'</strong><div>Values: '+escapeHtml(JSON.stringify(run.inputs))+'</div><div>Expected output: <code>'+escapeHtml(run.expected||'(no output)')+'</code></div><div>Your output: <code>'+escapeHtml(run.actual||'(no output)')+'</code></div></div>');
  });
  fb.className='feedback '+(pass?'good':'bad');
  fb.textContent=pass?'✓ Code passed the answer key and all output tests.':'Your program did not pass all checks. Review the output below, edit your code, and try again.';
  results.innerHTML=lines.join('');
  saveProgress();updateNext();
 }catch(e){
  if(currentLesson===lessonIndex){codingChecked[lessonIndex]=false;codingPassed[lessonIndex]=false;fb.className='feedback bad';fb.textContent='Could not run Python: '+e.message;results.textContent='Your work is saved. Try checking again.';saveProgress();updateNext();}
 }finally{button.disabled=false;}
}
function displayCodeResults(){
 const fb=document.getElementById('codeFeedback');
 fb.className='feedback '+(codingPassed[currentLesson]?'good':'');
 fb.textContent=codingPassed[currentLesson]?'✓ Code passed the answer key and output tests.':'Your previous code check did not pass. Click Check My Code to see the output tests again.';
}
function updateNext(){document.getElementById('nextBtn').disabled=!lessonReady(currentLesson);renderTabs();}
function nextLesson(){if(!lessonReady(currentLesson))return;if(currentLesson<lessons.length-1){currentLesson++;render();window.scrollTo({top:0,behavior:'smooth'});}else{currentLesson=lessons.length;render();}}
function clearCurrentLesson(){
 const i=currentLesson;
 if(!confirm('Clear Lesson '+(i+1)+'? Your other lessons will stay saved.'))return;
 answers[i].fill(null);questionCorrect[i].fill(false);questionAttempts[i].fill(0);codingChecked[i]=false;codingPassed[i]=false;codeEntries[i]='';
 optionOrders[i]=makeOptionOrders()[i];localStorage.removeItem(CHAPTER16_SENT_KEY);saveProgress();render();
}
function gradePercent(){const correct=questionCorrect.reduce((n,a)=>n+a.filter(Boolean).length,0)+codingPassed.filter(Boolean).length;const total=lessons.reduce((n,l)=>n+l.questions.length+1,0);return Math.round(correct/total*100);}
function showFinish(){
 lessonView.innerHTML='';finishCard.classList.remove('hidden');
 const correct=questionCorrect.reduce((n,a)=>n+a.filter(Boolean).length,0),possible=lessons.reduce((n,l)=>n+l.questions.length,0);
 document.getElementById('finalScore').textContent=`Score: ${gradePercent()}% — Multiple-choice: ${correct} / ${possible} correct; coding: ${codingPassed.filter(Boolean).length} / ${lessons.length} complete.`;
 document.getElementById('resultsMessage').textContent=gradePercent()===100?'Excellent work! All questions and coding activities are correct.':'Review your lesson scores below.';
 document.getElementById('resultsBreakdown').innerHTML=lessons.map((l,i)=>`<div class="result-row"><strong>Lesson ${i+1}:</strong> ${questionCorrect[i].filter(Boolean).length} / ${l.questions.length} questions correct; coding ${codingPassed[i]?'complete':'incomplete'}</div>`).join('');
 refreshSubmission();
 progressText.textContent='Results';progressBar.style.width='100%';
}
const GRADE_ENDPOINT='https://script.google.com/a/macros/benhillschools.org/s/AKfycbz9IipEcz2wq8Hbye5zC3pyuXFCW9_4PlutdfW3oRwfKcTW5jMgV3FqxNYVWupvJ8kO/exec';
const CHAPTER16_SENT_KEY='csp16-grade-submitted';
function refreshSubmission(){
 const sent=localStorage.getItem(CHAPTER16_SENT_KEY)==='1';
 const button=document.getElementById('submitResultsBtn');
 button.hidden=false;
 button.disabled=!allLessonsReady();
 button.textContent=sent?'Send Results Again':'Submit Results';
 document.getElementById('submissionStatus').textContent=sent?'A submission request was sent previously. Check your grade checker to confirm recording; you may send again if needed.':allLessonsReady()?'All three lessons complete. Submit your grade below.':'Complete every question (correct or two attempts used) and all coding challenges before submitting.';
}
document.getElementById('submitResultsBtn').addEventListener('click',async()=>{
 const status=document.getElementById('submissionStatus');
 if(!allLessonsReady()){status.textContent='Complete all three lessons before submitting.';return;}
 let student=null;
 try{student=JSON.parse(localStorage.getItem('csp16-student-info')||'null')}catch(e){}
 if(!student?.first||!student?.last||!student?.period){status.textContent='Student information is missing. Please complete the student information form.';return;}
 const button=document.getElementById('submitResultsBtn');
 button.disabled=true;status.textContent='Sending Chapter 16 score…';
 const payload={name:student.last+', '+student.first,period:student.period,chapter:'Chapter 16 | Real-World Algorithms',score:gradePercent()};
 try{
  await fetch(GRADE_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  localStorage.setItem(CHAPTER16_SENT_KEY,'1');
  status.textContent='Submission request sent. Please check your Grade Checker or spreadsheet to confirm recording; this message does not confirm acceptance.';
  button.textContent='Send Results Again';
 }catch(e){status.textContent='Unable to send your score. Check your internet connection and try again.';}
 button.disabled=false;
});
document.getElementById('backToLabBtn').addEventListener('click',()=>{currentLesson=0;render();window.scrollTo({top:0,behavior:'smooth'});});
document.getElementById('resetBtn').addEventListener('click',()=>{if(!confirm('Reset all answers and coding work? This cannot be undone.'))return;currentLesson=0;answers.forEach(a=>a.fill(null));questionCorrect.forEach(a=>a.fill(false));questionAttempts.forEach(a=>a.fill(0));codingChecked.fill(false);codingPassed.fill(false);codeEntries.fill('');optionOrders=makeOptionOrders();localStorage.removeItem(chapter16ProgressKey);localStorage.removeItem(CHAPTER16_SENT_KEY);localStorage.removeItem(chapter16PageKey);render();window.scrollTo({top:0,behavior:'smooth'});});
render();