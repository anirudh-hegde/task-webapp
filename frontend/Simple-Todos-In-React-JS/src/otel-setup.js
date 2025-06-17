// import {WebTracerProvider} from '@opentelemetry/sdk-trace-web'
// import {
//   ConsoleSpanExporter,
//   SimpleSpanProcessor,
// } from '@opentelemetry/sdk-trace-base'
// import {FetchInstrumentation} from '@opentelemetry/instrumentation-fetch'
// import {DocumentLoadInstrumentation} from '@opentelemetry/instrumentation-document-load'

// const provider = new WebTracerProvider()
// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
// provider.register()
// new FetchInstrumentation().enable()
// new DocumentLoadInstrumentation().enable()

// otel-setup.js (or .ts)

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'   // ← missing import :contentReference[oaicite:0]{index=0}
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

// 1️⃣ Provider with a service name that shows up in SigNoz
const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'react-frontend',   // pick a name you like
  }),
});

// 2️⃣ Exporter that ships traces to SigNoz Cloud
const otlpExporter = new OTLPTraceExporter({
  url: 'https://ingest.in.signoz.cloud:4318/v1/traces',
  headers: { 'api-key': 'e9bfcba0-a5a1-4d45-b2d5-38d332625ac8' },
});

// 3️⃣ Wire both exporters to the provider
provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));      // to SigNoz
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));  // local dev logging
provider.register();

// 4️⃣ Enable auto‑instrumentations
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation(),
    new DocumentLoadInstrumentation(),
  ],
});
