import {config} from 'dotenv'

config({quiet: true})

export const getEnvCredentials = (
	credential: string | undefined,
): string | never => {
	if (!credential) {
		throw new Error(
			`Environment variable ${credential} is not set in .env file or in the ci pipeline.`,
		)
	}
	return credential
}
