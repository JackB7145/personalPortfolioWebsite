module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/experiences/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    // Simulate LinkedIn API delay
    await new Promise((resolve)=>setTimeout(resolve, 150));
    const experiences = [
        {
            id: '1',
            title: 'Software Engineering Intern',
            company: 'Scotiabank',
            location: 'Toronto, ON',
            duration: 'Sept 2025 – May 2026',
            description: 'Designed and deployed cloud-based data infrastructure in Google Cloud to support portfolio analytics and ETL automation across Scotiabank’s asset management teams.',
            achievements: [
                'Built and deployed an Airflow ETL pipeline in GCP Composer automating ingestion of 190,000+ financial articles for 200+ portfolio managers.',
                'Reduced ingestion latency by 37% through a hybrid GCS–BigQuery storage design with metadata optimization.',
                'Prototyped an Agentic RAG AI system to automate sentiment analytics and data retrieval workflows.'
            ],
            type: 'internship'
        },
        {
            id: '2',
            title: 'Software Engineering Intern',
            company: 'Scotiabank',
            location: 'Toronto, ON',
            duration: 'May 2025 – Sept 2025',
            description: 'Enhanced reliability and performance of Scotiabank’s KYC service platform by modernizing backend systems and improving test coverage.',
            achievements: [
                'Migrated Java 8 Spring controllers to Java 17 Spring Boot, cutting response times by 45%.',
                'Maintained and expanded 50+ JUnit and Mockito tests, raising code coverage by 8%.',
                'Resolved over 100 security risks identified via Tenable and Splunk vulnerability reports.',
                'Streamlined deployments by optimizing Oracle stored procedures and Jenkins CI/CD jobs on Azure.'
            ],
            type: 'internship'
        },
        {
            id: '3',
            title: 'Software Engineering Intern',
            company: 'Scotiabank',
            location: 'Toronto, ON',
            duration: 'May 2024 – Aug 2024',
            description: 'Developed internal tools and full-stack applications for data access and automation across Scotiabank technology teams.',
            achievements: [
                'Built a full-stack internal app using React, Node.js, TailwindCSS, SQL, JWT, and Express, integrating 20+ internal data streams.',
                'Reduced query setup time by 60% with a Flask web app for non-technical analytics users.'
            ],
            type: 'internship'
        },
        {
            id: '4',
            title: 'Tech Intern',
            company: 'Start.ca',
            location: 'London, ON',
            duration: 'July 2022 – Aug 2022',
            description: 'Supported technical service delivery and customer outreach for a regional ISP, combining hardware repair and client engagement.',
            achievements: [
                'Repaired devices and reinstalled firmware for residential customers.',
                'Generated $5,000+ in revenue through customer marketing and outreach.',
                'Collaborated with leadership to align service improvements with business goals.'
            ],
            type: 'internship'
        }
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(experiences);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f271632c._.js.map