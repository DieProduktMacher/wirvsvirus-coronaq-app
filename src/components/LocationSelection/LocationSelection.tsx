import React, {useState, useContext, useEffect} from "react";

import {Context as FirebaseContext} from '../../services/Firebase';

export const LocationSelection = () => {

  const firebase = useContext(FirebaseContext);
  const [questions, setQuestions] = useState<any>(null);

  useEffect(() => {
    firebase?.firestore
      .collection('questions')
      .where('countryCode', '==', 'de')
      .get()
      .then(result => {
        setQuestions(result.docs.map(doc => doc.data()));
      });
  });

  return <div className="location">
    <h1>location (which should have access to firebase)</h1>
    {questions && (
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    )}
  </div>

}
