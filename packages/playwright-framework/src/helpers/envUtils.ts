import {config} from 'dotenv'

config({quiet: true})

export const getEnvCredentials = (credential: string): string | never => {
	const value = process.env[credential]
	if (!value) {
		throw new Error(
			`Environment variable ${credential} is not set in .env file or in the ci pipeline.`,
		)
	}
	return value
}
