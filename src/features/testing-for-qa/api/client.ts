/**
 * The `Testing for QA` feature's typed data contract.
 *
 * Three things are declared here and nowhere else: the interface every implementation
 * satisfies (`TestingForQaApi`), the single error type a rejection carries (`ApiError`,
 * discriminated by `ApiErrorCode`), and the branch search field's validation rule
 * (`BRANCH_QUERY_PATTERN` and `validateBranchQuery`) together with the three messages
 * the field renders.
 *
 * This module is a contract, not an implementation: it issues no request, holds no
 * state and renders nothing, so the mock that satisfies it today and a real HTTP client
 * later are interchangeable. Dependencies run one way — `api/` <- `hooks/` <-
 * `components/` <- `pages/` — and this module imports nothing but the feature's shared
 * models, so no layer above it is reachable from here.
 */

import type {
  BranchDetail,
  BranchSearchResult,
  BranchSelection,
  TreePage,
} from '@/features/testing-for-qa/types'

/**
 * Why a request failed, expressed as a discriminant rather than a message.
 *
 * A screen decides what to render from the code alone — `'not-found'` is an absent
 * item, `'invalid-input'` is a query the field must report inline, `'unavailable'` is a
 * failed request that offers a retry — so no caller inspects a string to tell them
 * apart.
 */
export type ApiErrorCode = 'not-found' | 'unavailable' | 'invalid-input' | 'unknown'

/**
 * The fields carried by every rejection of `TestingForQaApi`.
 */
export interface ApiErrorShape {
  /** Why the request failed, as a value a caller can branch on. */
  code: ApiErrorCode
  /** A human-readable description of the failure, safe to render as-is. */
  message: string
  /** The offending input's field name when the failure concerns one input, else absent. */
  field?: string
}

/**
 * The only error a `TestingForQaApi` implementation throws.
 *
 * A rejection always carries this class rather than a bare `Error` or an error-shaped
 * payload, so a caller can separate an absent item from a failed request at the type
 * level and never mistake a failure for data.
 */
export class ApiError extends Error implements ApiErrorShape {
  /** Why the request failed. */
  readonly code: ApiErrorCode
  /** The offending input's field name, when the failure concerns one input. */
  readonly field?: string

  /**
   * @param code - Why the request failed.
   * @param message - A human-readable description of the failure, safe to render.
   * @param field - The offending input's field name, for a failure about one input.
   */
  constructor(code: ApiErrorCode, message: string, field?: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.field = field
    // Restores the prototype chain, so `instanceof ApiError` holds for callers even
    // where this class is transpiled below ES2015 and a built-in `Error` subclass would
    // otherwise lose it.
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

/**
 * The feature's data contract: four methods and no more, one per data need.
 *
 * Everything a screen renders arrives through one of these methods, and each method's
 * failure reaches the caller as an `ApiError` — never as a resolved payload with an
 * error inside it. The implementation selected today is the mock; a real client
 * replaces it by satisfying this same interface.
 */
export interface TestingForQaApi {
  /**
   * Loads one window of the tree's rendered rows.
   *
   * The window is measured in rendered rows rather than nodes, so the row that the
   * search field (or the closed search action row) occupies counts as one of them.
   *
   * @param params - `repositoryId` selects whose tree is read; `cursor` names the
   * window to read, `null` for the first; `branches` says whether the repository's
   * branch entries have arrived, where the literal `'pending'` returns the branchless
   * repository view and the omitted value means `'loaded'`.
   * @returns The window's rows, the cursor that advances to the next window (`null` at
   * the end of the list) and the list's total row count.
   * @throws {ApiError} with code `'unavailable'` when the tree cannot be read.
   */
  listTree(params: {
    repositoryId: string
    cursor: string | null
    branches?: 'loaded' | 'pending'
  }): Promise<TreePage>

  /**
   * Searches the repository's branch entries for one query.
   *
   * A query that fails `validateBranchQuery` is refused here as well as in the field, so
   * the rule holds for every caller and not only for the UI.
   *
   * @param params - `repositoryId` selects whose branches are searched; `query` is the
   * raw text from the field, validated before any work is done.
   * @returns The single matched branch row (or `null` for the no-match state), the tail
   * folder rows that stay below the result, and the filtered list's total row count.
   * @throws {ApiError} with code `'invalid-input'` and `field` `'query'` when the query
   * fails the rule, or code `'unavailable'` when the search cannot be performed.
   */
  searchBranches(params: { repositoryId: string; query: string }): Promise<BranchSearchResult>

  /**
   * Selects a branch and returns what the confirmation shows.
   *
   * @param params - `repositoryId` selects whose branch is chosen; `branchName` is the
   * name to select.
   * @returns The selected branch, its ancestor chain of names (root first), and the
   * restored window of rows with the branch marked.
   * @throws {ApiError} with code `'not-found'` when no such branch exists in the
   * repository, or code `'unavailable'` when the selection cannot be performed.
   */
  selectBranch(params: { repositoryId: string; branchName: string }): Promise<BranchSelection>

  /**
   * Reads one branch, as the item route renders it.
   *
   * @param params - `repositoryId` selects the repository to read from; `branchName` is
   * the name the route carries.
   * @returns The branch's name and its full ancestor chain of names, root first.
   * @throws {ApiError} with code `'not-found'` when the name is outside the repository
   * — the absent-item outcome the item route renders as its not-found state — or code
   * `'unavailable'` when the branch cannot be read.
   */
  getBranch(params: { repositoryId: string; branchName: string }): Promise<BranchDetail>
}

/**
 * The characters a branch search query may contain: ASCII letters, digits, dot,
 * underscore, forward slash and hyphen, with nothing before or after the match, so a
 * partial match cannot pass and whitespace never reaches the client.
 */
export const BRANCH_QUERY_PATTERN = /^[A-Za-z0-9._\/-]+$/

/** The greatest length the field accepts; the rejection message states the same limit. */
const MAX_BRANCH_QUERY_LENGTH = 64

/**
 * The outcome of validating a raw search query.
 */
export interface BranchQueryValidation {
  /** Whether the query passes every rule, so a request may be issued. */
  valid: boolean
  /**
   * The trimmed query: the value to send when `valid` is `true`, and the trimmed input
   * the caller still holds when it is `false`.
   */
  query: string
  /** The inline message to render at the field when `valid` is `false`; absent when valid. */
  message?: string
}

/**
 * Validates the branch search field's query and supplies the message for each failure.
 *
 * This is the single definition of the field's rule: the field, the search hook and the
 * client all agree by calling this one function, so the message a user sees and the
 * query a request carries can never drift from the rule. A query is trimmed first, then
 * checked in order — empty, then longer than the accepted length, then any character
 * outside `BRANCH_QUERY_PATTERN` — so the message a caller receives is always the most
 * specific one that applies.
 *
 * @param query - The raw text from the field, untrimmed and unvalidated.
 * @returns A result carrying the trimmed query and, when the query fails, the exact
 * message to render at the field.
 */
export function validateBranchQuery(query: string): BranchQueryValidation {
  const trimmed = query.trim()

  if (trimmed.length === 0) {
    return { valid: false, query: trimmed, message: 'Enter a branch name to search.' }
  }

  if (trimmed.length > MAX_BRANCH_QUERY_LENGTH) {
    return { valid: false, query: trimmed, message: 'Branch names are at most 64 characters.' }
  }

  if (!BRANCH_QUERY_PATTERN.test(trimmed)) {
    return {
      valid: false,
      query: trimmed,
      message: 'Branch names can use letters, numbers, dots, dashes, underscores and slashes.',
    }
  }

  return { valid: true, query: trimmed }
}
