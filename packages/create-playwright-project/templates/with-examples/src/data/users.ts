import type {UserTypes} from '@/types'

export const SAUCE_DEMO_USERS: UserTypes = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const

// Convenience exports for common use cases
export const STANDARD_USER = SAUCE_DEMO_USERS.standard
export const LOCKED_OUT_USER = SAUCE_DEMO_USERS.lockedOut
export const PROBLEM_USER = SAUCE_DEMO_USERS.problem
export const INVALID_USER = SAUCE_DEMO_USERS.invalid
