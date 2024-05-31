/**
 * This schema provides the report format for Code Quality analyzers (https://docs.gitlab.com/ee/ci/testing/code_quality.html).
 */
interface Location {
    // The file path relative to /code.
    path: string;
    lines: {
        begin: number;
        end: number;
    };
    positions: {
        // Line and column coordinates. (You can roughly think of these as X/Y axis.)
        begin: {
            line: number;
            column: number;
        };
        // Line and column coordinates. (You can roughly think of these as X/Y axis.)
        end: {
            line: number;
            column: number;
        };
    };
    // An absolute character offset in the source file.
    offset?: number;
}

// The severity level of the issue.
export type Severity = 'info' | 'minor' | 'major' | 'critical' | 'blocker';

export interface Issue {
    // The type of the object, always 'issue'.
    type: 'issue';
    // A unique name representing the static analysis check that emitted this issue.
    check_name: string;
    // A string explaining the issue that was detected.
    description: string;
    // A markdown snippet describing the issue, including deeper explanations and links to other resources.
    content: {
        body: string;
    };
    // Categories indicating the nature of the issue.
    categories: (
        | 'Bug Risk'
        | 'Clarity'
        | 'Compatibility'
        | 'Complexity'
        | 'Duplication'
        | 'Performance'
        | 'Security'
        | 'Style'
        )[];
    // Locations refer to ranges of a source code file. A Location contains a path and a source range (expressed as lines or positions).
    location: Location;
    // An array of additional Location objects related to the issue.
    other_locations?: Location[];
    // An integer indicating a rough estimate of how long it would take to resolve the issue.
    remediation_points?: number;
    // The severity level of the issue.
    severity: Severity;
    // A unique, deterministic identifier for the specific issue being reported.
    fingerprint: string;
    // An object representing other interesting source code locations related to this issue.
    trace?: {
        // An array of Location objects.
        locations: Location[];
        // Default: false. When true, this Trace object will be treated like an ordered stacktrace.
        stacktrace: boolean;
    };
}



