// @ts-nocheck
// NOTE: Type-checking is disabled because the interrupt feature is not yet published in the installed SDK.

import { Agent, tool, SessionManager, FileStorage } from '@strands-agents/sdk'
import { BeforeToolCallEvent } from '@strands-agents/sdk'
import { z } from 'zod'

// =====================
// Hooks Example
// =====================

async function hooksExample() {
  const deleteFiles = tool({
    name: 'delete_files',
    description: 'Delete files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input) => {
      // Implementation here
      return true
    },
  })

  const inspectFiles = tool({
    name: 'inspect_files',
    description: 'Inspect files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input) => {
      // Implementation here
      return {}
    },
  })

  // --8<-- [start:hooks_example]
  const agent = new Agent({
    systemPrompt: 'You delete files older than 5 days',
    tools: [deleteFiles, inspectFiles],
  })

  agent.addHook(BeforeToolCallEvent, (event) => {
    if (event.toolUse.name !== 'delete_files') return

    const approval = event.interrupt<string>({
      name: 'myapp-approval',
      reason: { paths: (event.toolUse.input as { paths: string[] }).paths },
    })
    if (approval.toLowerCase() !== 'y') {
      event.cancel = 'User denied permission to delete files'
    }
  })

  const paths = ['a/b/c.txt', 'd/e/f.txt']
  let result = await agent.invoke(`paths=<${JSON.stringify(paths)}>`)

  while (result.stopReason === 'interrupt') {
    const responses = result.interrupts!.map((interrupt) => ({
      interruptResponse: {
        interruptId: interrupt.id,
        // In a real app, collect user input here
        response: 'y',
      },
    }))

    result = await agent.invoke(responses)
  }

  console.log('MESSAGE:', JSON.stringify(result.lastMessage))
  // --8<-- [end:hooks_example]
}

// =====================
// Tools Example
// =====================

async function toolsExample() {
  // --8<-- [start:tools_example]
  const deleteFiles = tool({
    name: 'delete_files',
    description: 'Delete files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input, context) => {
      const approval = context.interrupt<string>({
        name: 'myapp-approval',
        reason: { paths: input.paths },
      })
      if (approval.toLowerCase() !== 'y') return false

      // Implementation here

      return true
    },
  })

  const inspectFiles = tool({
    name: 'inspect_files',
    description: 'Inspect files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input) => {
      // Implementation here
      return {}
    },
  })

  const agent = new Agent({
    systemPrompt: 'You delete files older than 5 days',
    tools: [deleteFiles, inspectFiles],
  })

  // ...
  // --8<-- [end:tools_example]
}

// =====================
// Session Management Example
// =====================

async function sessionManagementExample() {
  const deleteFiles = tool({
    name: 'delete_files',
    description: 'Delete files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input) => {
      // Implementation here
      return true
    },
  })

  const inspectFiles = tool({
    name: 'inspect_files',
    description: 'Inspect files at the given paths',
    inputSchema: z.object({ paths: z.array(z.string()) }),
    callback: (input) => {
      // Implementation here
      return {}
    },
  })

  // --8<-- [start:session_management]
  // Server function — creates a fresh agent with session management each call
  async function server(
    prompt: string | { interruptResponse: { interruptId: string; response: unknown } }[]
  ) {
    const agent = new Agent({
      systemPrompt: 'You delete files older than 5 days',
      tools: [deleteFiles, inspectFiles],
      sessionManager: new SessionManager({
        sessionId: 'myapp',
        storage: { snapshot: new FileStorage('/path/to/storage') },
      }),
    })

    agent.addHook(BeforeToolCallEvent, (event) => {
      if (event.toolUse.name !== 'delete_files') return

      // Check if user already trusted this approval
      if (event.agent.appState.get('myapp-approval') === 't') return

      const approval = event.interrupt<string>({
        name: 'myapp-approval',
        reason: { paths: (event.toolUse.input as { paths: string[] }).paths },
      })
      if (!['y', 't'].includes(approval.toLowerCase())) {
        event.cancel = 'User denied permission to delete files'
      }

      event.agent.appState.set('myapp-approval', approval.toLowerCase())
    })

    return agent.invoke(prompt)
  }

  // Client function
  async function client(paths: string[]) {
    let result = await server(`paths=<${JSON.stringify(paths)}>`)

    while (result.stopReason === 'interrupt') {
      const responses = result.interrupts!.map((interrupt) => ({
        interruptResponse: {
          interruptId: interrupt.id,
          // In a real app, collect user input here
          response: 'y',
        },
      }))

      result = await server(responses)
    }

    return result
  }

  const paths = ['a/b/c.txt', 'd/e/f.txt']
  const result = await client(paths)
  console.log('MESSAGE:', JSON.stringify(result.lastMessage))
  // --8<-- [end:session_management]
}

// Suppress unused function warnings
void hooksExample
void toolsExample
void sessionManagementExample
