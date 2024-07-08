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
        <div className="container">
            <h2>Report Generator</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your query"
                    className="input"
                />
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="select"
                >
                    <option value="research_report">Research Report</option>
                    <option value="resource_report">Resource Report</option>
                    <option value="outline_report">Outline Report</option>
                    <option value="custom_report">Custom Report</option>
                    <option value="subtopic_report">Subtopic Report</option>
                </select>
                <button onClick={handleGenerateReport} disabled={loading} className="button">
                    {loading ? 'Generating...' : 'Generate Report'}
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
            {streamedReport && !loading && (
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
                    max-width: 980px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #0f0f17;
                    color: #ffffff;
                    border-radius: 12px;
                    border: 1px solid #2a2a3c;
                }
                h2 {
                    margin-bottom: 20px;
                    font-size: 24px;
                }
                .input-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .input, .select, .button {
                    padding: 10px;
                    background-color: #1a1a2e;
                    color: #ffffff;
                    border: 1px solid #2a2a3c;
                    border-radius: 6px;
                    font-size: 14px;
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
                    background-color: #1a1a2e;
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
                }
            `}</style>
        </div>
    );
};

export default ReportGenerator;