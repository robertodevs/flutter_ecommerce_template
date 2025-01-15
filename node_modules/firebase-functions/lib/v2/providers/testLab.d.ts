import { CloudEvent, CloudFunction } from "../core";
import { EventHandlerOptions } from "../options";
/** Possible test states for a test matrix. */
export type TestState = 
/** The default value. This value is used if the state is omitted. */
"TEST_STATE_UNSPECIFIED"
/** The test matrix is being validated. */
 | "VALIDATING"
/** The test matrix is waiting for resources to become available. */
 | "PENDING"
/** The test matrix has completed normally. */
 | "FINISHED"
/** The test matrix has completed because of an infrastructure failure. */
 | "ERROR"
/** The test matrix was not run because the provided inputs are not valid. */
 | "INVALID";
/** Outcome summary for a finished test matrix. */
export type OutcomeSummary = 
/** The default value. This value is used if the state is omitted. */
"OUTCOME_SUMMARY_UNSPECIFIED"
/**
 * The test matrix run was successful, for instance:
 * - All test cases passed.
 * - No crash of the application under test was detected.
 */
 | "SUCCESS"
/**
 * A run failed, for instance:
 * - One or more test case failed.
 * - A test timed out.
 * - The application under test crashed.
 */
 | "FAILURE"
/**
 * Something unexpected happened. The test run should still be considered
 * unsuccessful but this is likely a transient problem and re-running the
 * test might be successful.
 */
 | "INCONCLUSIVE"
/** All tests were skipped. */
 | "SKIPPED";
/** Locations where test results are stored. */
export interface ResultStorage {
    /**
     * Tool Results history resource containing test results. Format is
     * `projects/{project_id}/histories/{history_id}`.
     * See https://firebase.google.com/docs/test-lab/reference/toolresults/rest
     * for more information.
     */
    toolResultsHistory: string;
    /**
     * Tool Results execution resource containing test results. Format is
     * `projects/{project_id}/histories/{history_id}/executions/{execution_id}`.
     * Optional, can be omitted in erroneous test states.
     * See https://firebase.google.com/docs/test-lab/reference/toolresults/rest
     * for more information.
     */
    toolResultsExecution: string;
    /** URI to the test results in the Firebase Web Console. */
    resultsUri: string;
    /**
     * Location in Google Cloud Storage where test results are written to.
     * In the form "gs://bucket/path/to/somewhere".
     */
    gcsPath: string;
}
/** Information about the client which invoked the test. */
export interface ClientInfo {
    /** Client name, such as "gcloud". */
    client: string;
    /** Map of detailed information about the client. */
    details: Record<string, string>;
}
/** The data within all Firebase test matrix completed events. */
export interface TestMatrixCompletedData {
    /** Time the test matrix was created. */
    createTime: string;
    /** State of the test matrix. */
    state: TestState;
    /**
     * Code that describes why the test matrix is considered invalid. Only set for
     * matrices in the INVALID state.
     */
    invalidMatrixDetails: string;
    /** Outcome summary of the test matrix. */
    outcomeSummary: OutcomeSummary;
    /** Locations where test results are stored. */
    resultStorage: ResultStorage;
    /** Information provided by the client that created the test matrix. */
    clientInfo: ClientInfo;
    /** ID of the test matrix this event belongs to. */
    testMatrixId: string;
}
/**
 * Event handler which triggers when a Firebase test matrix completes.
 *
 * @param handler - Event handler which is run every time a Firebase test matrix completes.
 * @returns A Cloud Function that you can export and deploy.
 * @alpha
 */
export declare function onTestMatrixCompleted(handler: (event: CloudEvent<TestMatrixCompletedData>) => any | Promise<any>): CloudFunction<CloudEvent<TestMatrixCompletedData>>;
/**
 * Event handler which triggers when a Firebase test matrix completes.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firebase test matrix completes.
 * @returns A Cloud Function that you can export and deploy.
 * @alpha
 */
export declare function onTestMatrixCompleted(opts: EventHandlerOptions, handler: (event: CloudEvent<TestMatrixCompletedData>) => any | Promise<any>): CloudFunction<CloudEvent<TestMatrixCompletedData>>;
