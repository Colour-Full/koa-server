import { getSpaEnvVars } from '..'

describe('configMiddleware', () => {
  describe('getSpaEnvVars', () => {
    const env = {
      PORT: '9001',
      LOGSTASH_MODE: 'console',
      SPA_LOGSTASH_MODE: 'logstash',
      SPA_LOGSTASH_HOST: 'logstash.rullion.co.uk'
    }

    it('works', () => {
      const result = getSpaEnvVars(env)
      expect(result).toBeTruthy()
      expect(result).toMatchSnapshot()
    })
  })
})
