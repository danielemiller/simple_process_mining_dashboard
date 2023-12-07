// src/app/models/process-representation.model.ts

export interface ProcessRepresentationResponse {
    graph_representation?: string; // base64 encoded string for graph
    bpmn?: string; // XML string for BPMN
    text_representation?: string; // Plain text for text representation
  }
  