import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

// Using states
// 1. Define state variable
// 2. Use state variable
// 3. Update state variable

function App() {
  // Define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function() {
    async function getFacts() {
      setIsLoading(true);
      const { data: facts, error} = await supabase
    .from('facts').select('*')
    .order('votesInteresting', { ascending: false })
    .limit(1000);

    if(!error) setFacts(facts);
    else alert('There was a problem loading the data');
    setIsLoading(false);
    }
    getFacts();
  }, []);

  return (
    <>
    <Header showForm = {showForm}setShowForm = {setShowForm}/>
    
    {/* Use state variable */}
    {showForm ? <NewFactForm setFacts={setFacts} 
    setShowForm={setShowForm}/> : null}

    <main className = "main">
      <CategoryFilter />
      {isLoading ? <Loader /> : <FactList facts={facts}/>}
    </main>
    </>
  )
};

function Loader() {
  return <p className='message'>Loading...</p>
};

function Header({ showForm, setShowForm }) {
  const appTitle = 'Today I Learned';

  return (
  <header className="header">
            <div className="logo">
                <img src="logo.png" alt="Today I Learned Logo" />
            <h1>{appTitle}</h1>
            </div>
            
            <button className="btn btn-large btn-open" 
            // update state variable
            onClick={() => setShowForm((show) => !show)}>{showForm ? 'Close' : 'Share a fact'}</button>
        </header>
)};

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText]=useState("");
  const [source, setSource]=useState("http://example.com");
  const [category, setCategory]=useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category)
    // TODO Prevent browser reload

    // TODO Check if data is valid. If valid create a new fact
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {      
    // TODO Create a new fact object
      const newFact = {
        id: Math.round(Math.random() * 1000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear()
      }
    // TODO Add new fact to the UI: add the fact to state
      setFacts((facts) => [newFact, ...facts])
    // TODO Reset input fields
      setText('');
      setSource('');
      setCategory('');
    // TODO Close entire form
      setShowForm(false);
    };
  };

  return <form className="fact-form" onSubmit={handleSubmit}>
    <input type = "text" placeholder="Share a fact with the world" value={text} 
    onChange={(e) => setText(e.target.value)}/>
            <span>{200 - textLength}</span>
            <input value={source} type="text" placeholder="source url" onChange={(e) => setSource(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose category:</option>
                {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
            </select>
            <button className = "btn btn-large">Submit</button>
  </form>
};

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function CategoryFilter() {
  return <aside>
    <ul>
    <li className="category"><button className="btn btn-all-categories">All</button></li>
      {CATEGORIES.map((cat) => 
      <li key={cat.name} className="category">
        <button className="btn btn-category" style={{ backgroundColor: cat.color }}>{cat.name}</button></li>)}
    </ul>
  </aside>
};

function FactList({ facts }) {  
  return <section><ul className="facts-list">{
    facts.map((fact) => <Fact key={fact.id} fact={fact}/>)}
    </ul>
    <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
};

function Fact({ fact }) {
  return (
  <li className="fact">
  <p>
  {fact.text}
  <a className="source" href={fact.source} >(source)</a>
  </p>
  <span className="tag" style={{backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category).color}}>{fact.category}</span>
  <div className="vote-buttons">
      <button>???? {fact.votesInteresting}</button>
      <button>???? {fact.votesMindBlowing}</button>
      <button>?????? {fact.votesFalse}</button>
  </div>
  </li>
)};

export default App;