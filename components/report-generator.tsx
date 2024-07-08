"use client"

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './report-generator.css';

const ReportGenerator: React.FC = () => {
    const [query, setQuery] = useState('');
    const [reportType, setReportType] = useState('research_report');
    const [report, setReport] = useState('');
    const [streamedReport, setStreamedReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < report.length) {
                setStreamedReport(prev => prev + report[index]);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 5);
        return () => clearInterval(intervalId);
    }, [report]);

    const handleGenerateReport = async () => {
        setLoading(true);
        setError('');
        setReport('');
        setStreamedReport('');
        try {
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, reportType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const data = await response.json();
            setReport(data.report);
        } catch (error) {
            setError('Error generating report');
            console.error('Error generating report', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = () => {
        const blob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'research_report.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        
        <div className="flex min-h-screen flex-col">         
            <nav className="mx-auto flex w-full max-w-8xl items-center justify-between pb-10 pt-[3.25rem]">
            <div className="flex-1 rounded-3xl bg-gradient-to-br from-red-400 to-purple-500 p-[1px] transition duration-300 hover:shadow-2xl hover:shadow-purple-950">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-slate-200 px-6 dark:bg-slate-950">
            <div>
                <h3>CR.ai</h3><br/>
                <h2>Générez un compte rendu sur n'importe quel sujet !</h2><br/>
                    <div className="container"><img className="image" src=".././images/ai-tools/cr-ai.webp"/></div>
                    <br/>
                <p>Tout d'abord, selectionnez le type de compte rendu désiré parmis les 4 options :<br/><br/>
                - CR d'informations : Une recherche poussée et approfondie sur le sujet demandé, <br/>
                - CR de Ressources : Crée une liste de ressources disponibles sur le sujet demandé ainsi qu'un court résumé de chacune.<br/><br/>
                L'IA effectue plusieurs recherches en ligne, cela peut prendre quelques secondes..! ;) <br/>
                </p>
            </div>
            <div className="input-group custom-margin">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Entrez votre sujet de recherche... ex: IA générative, Elections 2024, ..."
                    className="input"
                />
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="select"
                >
                    <option value="research_report">Informations</option>
                    <option value="resource_report">Ressources</option>
                    <option value="outline_report">Outline Report</option>
                    <option value="custom_report">Custom Report</option>
                    <option value="subtopic_report">Subtopic Report</option>
                </select>
                <button onClick={handleGenerateReport} disabled={loading} className="button">
                    {loading ? 'Searching...' : 'Générer le CR'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {loading && (
                <div className="loading-container">
                    <svg className="loading-animation" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#3a3a5c" strokeWidth="8" />
                        <path className="loading-path" d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="#6a6a9c" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                    <div className="loading-text">Generating Amazing Report</div>
                </div>
            )}
            {streamedReport && (
                <div className="report-container">
                    <h3>Generated Report</h3>
                    <div className="markdown-body">
                        <ReactMarkdown>{streamedReport}</ReactMarkdown>
                    </div>
                    <button onClick={handleDownloadReport} className="button download-button">
                        Download Report
                    </button>
                </div>
            )}
            <style jsx>{`
                .container {
                    max-width: auto;
                    margin: 0 auto;
                    padding: 10px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .container img {
                    position: 50% 50%;
                }
                h2 {
                    font-size: 24px;
                    text-align: center;
                    font-family: Roboto;
                }
                p  {
                    font-family: Roboto;
                } 
                h3 {
                    margin-bottom: -20px;
                    margin-top:10px;
                    font-size: 36px;
                    text-align: center;
                    font-family: Cal Sans;
                }
                .input-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .custom-margin {
                    margin-top: 20px;
                }
                .input, .select, .button {
                    padding: 5px;
                    background-color: #1a1a2e;
                    color: #ffffff;
                    border: 1px solid #2a2a3c;
                    border-radius: 6px;
                    font-size: 18px;
                }
                .input {
                    flex-grow: 1;
                }
                .select {
                    width: 150px;
                }
                .button {
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    background-color: #3a3a5c;
                }
                .button:hover {
                    background-color: #4a4a7c;
                }
                .error {
                    color: #ff6b6b;
                    margin-bottom: 10px;
                }
                .report-container {
                    background-color: #0f0f17;
                    padding: 20px;
                    border-radius: 6px;
                    margin-top: 20px;
                }
                .download-button {
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin-top: 15px;
                }
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                }
                .loading-animation {
                    width: 100px;
                    height: 100px;
                    animation: rotate 2s linear infinite;
                }
                .loading-path {
                    stroke-dasharray: 150;
                    stroke-dashoffset: 150;
                    animation: dash 2s ease-in-out infinite, glow 2s ease-in-out infinite;
                }
                .loading-text {
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #6a6a9c;
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes dash {
                    0% {
                        stroke-dashoffset: 150;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -150;
                    }
                }
                @keyframes glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 5px #6a6a9c);
                    }
                    50% {
                        filter: drop-shadow(0 0 20px #6a6a9c);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                @media (max-width: 768px) {
                    .input-group {
                        flex-direction: column;
                    }
                    .select, .button {
                        width: 100%;
                    }
                @media (max-width: 768px) {
                    .input-group {
                        flex-direction: column;
                    }
                    .select, .button {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
        </div>
        </nav>
    </div>
    );
};

export default ReportGenerator;
