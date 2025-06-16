import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'

const provider = new WebTracerProvider()
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.register()
new FetchInstrumentation().enable()
new DocumentLoadInstrumentation().enable()
