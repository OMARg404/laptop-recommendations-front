import React from 'react';
import './App.css';
import RecommendationForm from './RecommendationForm';
import Footer from './Footer';

function App() {
    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > Laptop Recommendation System < /h1>  <
        /header>  <
        RecommendationForm / >
        <
        Footer / >
        <
        /div>
    );
}

export default App;