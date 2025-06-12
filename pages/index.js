import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data.reply || 'No response received.');
    } catch (error) {
      setResponse('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Ask Gemini ✨</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question..."
        className={styles.textarea}
      />
      <button onClick={handleSubmit} className={styles.button} disabled={loading}>
        {loading ? 'Thinking...' : 'Send to Gemini'}
      </button>
      {response && (
        <div className={styles.output}>
          <strong>Gemini says:</strong><br />
          {response}
        </div>
      )}
    </div>
  );
}
