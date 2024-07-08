import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { query, reportType } = req.body;
    const validReportTypes = ['research_report', 'resource_report', 'outline_report', 'custom_report', 'subtopic_report'];
    
    const chosenReportType = validReportTypes.includes(reportType) ? reportType : 'research_report';

    // Set environment variables explicitly
    const env = { ...process.env, USER_AGENT: 'MyApp/1.0' };

    const command = `python generate-report.py "${query}" "${chosenReportType}"`;

    exec(command, { env }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Command Error: ${error.message}`);
            return res.status(500).json({ error: `Error generating report: ${error.message}` });
        }
        if (stderr) {
            console.error(`Command Stderr: ${stderr}`);
            return res.status(500).json({ error: `Error generating report: ${stderr}` });
        }

        try {
            const reportPath = path.join(process.cwd(), 'public', 'research_report.md');
            const report = fs.readFileSync(reportPath, 'utf-8');
            res.status(200).json({ report });
        } catch (readError) {
            console.error(`Read Error: ${readError.message}`);
            return res.status(500).json({ error: `Error reading the report: ${readError.message}` });
        }
    });
}
