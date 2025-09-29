export interface UserCredentials {
  username: string
  password: string
}

export interface UserTypes {
  standard: UserCredentials
  lockedOut: UserCredentials
  problem: UserCredentials
  performanceGlitch: UserCredentials
  error: UserCredentials
  visual: UserCredentials
  invalid: UserCredentials
}
