import React from 'react'

export default function Error({ error }) {
    if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <p>
            {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ))
  }
  return (
    <div>
      <p>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  )
}

Error.defaultProps = {
  error: {},
}
