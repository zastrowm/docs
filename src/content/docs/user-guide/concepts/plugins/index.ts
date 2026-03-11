import { Agent, FunctionTool, Tool } from '@strands-agents/sdk'
import { BeforeToolCallEvent, AfterToolCallEvent, BeforeInvocationEvent } from '@strands-agents/sdk'

// =====================
// Plugin Types (from PR #619 - will be exported from @strands-agents/sdk)
// These mock types represent the Plugin API being added in PR #619
// =====================

/**
 * AgentData provides access to agent configuration during plugin initialization.
 * In the actual SDK, this will be a type representing agent-accessible data.
 */
interface AgentData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addHook<E extends object>(eventType: new (...args: any[]) => E, callback: (event: E) => void): () => void
}

/**
 * Plugin is an abstract base class for creating agent plugins.
 * Plugins can register hooks and provide tools to agents.
 */
abstract class Plugin {
  /**
   * The unique name identifier for this plugin.
   */
  abstract get name(): string

  /**
   * Called when the plugin is attached to an agent.
   * Use this to register hooks and perform initialization.
   */
  initAgent(_agent: AgentData): void {
    // Default implementation does nothing
  }

  /**
   * Returns an array of tools provided by this plugin.
   */
  getTools(): Tool[] {
    return []
  }
}

// Mock tools for examples
const myTool = new FunctionTool({
  name: 'my_tool',
  description: 'A sample tool',
  inputSchema: { type: 'object', properties: {} },
  callback: async () => 'result',
})

const debugPrintTool = new FunctionTool({
  name: 'debug_print',
  description: 'Print a debug message',
  inputSchema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'The message to print' },
    },
    required: ['message'],
  },
  callback: async (input: unknown) => {
    const typedInput = input as { message: string }
    console.log(`[DEBUG] ${typedInput.message}`)
    return `Printed: ${typedInput.message}`
  },
})

// Suppress unused variable warnings for mock tools
void myTool
void debugPrintTool

// =====================
// Using Plugins Example
// =====================

async function usingPluginsExample() {
  // --8<-- [start:using_plugins]
  // Create a custom plugin
  class MyPlugin extends Plugin {
    get name(): string {
      return 'my-plugin'
    }
  }

  // Create an agent with plugins
  const agent = new Agent({
    tools: [myTool],
    // plugins: [new MyPlugin()],  // Will be available when PR #619 is merged
  })

  // For now, plugins can be used with hooks
  void MyPlugin
  void agent
  // --8<-- [end:using_plugins]
}

// =====================
// Basic Plugin Structure
// =====================

async function basicPluginExample() {
  // --8<-- [start:basic_plugin]
  class LoggingPlugin extends Plugin {
    get name(): string {
      return 'logging-plugin'
    }

    override initAgent(agent: AgentData): void {
      // Register hooks manually in initAgent
      agent.addHook(BeforeToolCallEvent, (event) => {
        console.log(`[LOG] Calling tool: ${event.toolUse.name}`)
        console.log(`[LOG] Input: ${JSON.stringify(event.toolUse.input)}`)
      })

      agent.addHook(AfterToolCallEvent, (event) => {
        console.log(`[LOG] Tool completed: ${event.toolUse.name}`)
      })
    }

    override getTools(): Tool[] {
      return [debugPrintTool]
    }
  }

  // Using the plugin (when SDK supports plugins parameter)
  void LoggingPlugin
  // const agent = new Agent({ plugins: [new LoggingPlugin()] })
  // --8<-- [end:basic_plugin]
}

// =====================
// Hook Decorator Alternative
// =====================

async function hookDecoratorAlternativeExample() {
  // --8<-- [start:hook_decorator_alternative]
  class ModelMonitorPlugin extends Plugin {
    get name(): string {
      return 'model-monitor'
    }

    override initAgent(agent: AgentData): void {
      // Register multiple hooks in initAgent
      agent.addHook(BeforeInvocationEvent, () => {
        console.log('Agent invocation starting...')
      })

      // Hook registration returns a cleanup function
      const cleanup = agent.addHook(BeforeToolCallEvent, (event) => {
        console.log(`Tool being called: ${event.toolUse.name}`)
      })

      // cleanup() can be called later to unregister the hook
      void cleanup
    }
  }

  void ModelMonitorPlugin
  // --8<-- [end:hook_decorator_alternative]
}

// =====================
// Manual Hook and Tool Registration
// =====================

async function manualRegistrationExample() {
  // --8<-- [start:manual_registration]
  class ManualPlugin extends Plugin {
    private verbose: boolean

    constructor(options: { verbose?: boolean } = {}) {
      super()
      this.verbose = options.verbose ?? false
    }

    get name(): string {
      return 'manual-plugin'
    }

    override initAgent(agent: AgentData): void {
      // Conditionally register additional hooks
      if (this.verbose) {
        agent.addHook(BeforeToolCallEvent, (event) => {
          console.log(`[VERBOSE] ${JSON.stringify(event.toolUse)}`)
        })
      }

      // Access agent properties through the AgentData interface
      console.log('Plugin attached to agent')
    }
  }

  void ManualPlugin
  // --8<-- [end:manual_registration]
}

// =====================
// Plugin State Management
// =====================

async function stateManagementExample() {
  // --8<-- [start:state_management]
  class MetricsPlugin extends Plugin {
    private callCount: number = 0

    get name(): string {
      return 'metrics-plugin'
    }

    override initAgent(agent: AgentData): void {
      // Initialize call count tracking
      this.callCount = 0

      agent.addHook(BeforeToolCallEvent, () => {
        this.callCount++
        console.log(`Tool call count: ${this.callCount}`)
      })
    }

    getCallCount(): number {
      return this.callCount
    }
  }

  // Usage
  const metricsPlugin = new MetricsPlugin()
  // const agent = new Agent({ plugins: [metricsPlugin] })
  console.log(`Total tool calls: ${metricsPlugin.getCallCount()}`)
  // --8<-- [end:state_management]
}

// =====================
// Async Initialization
// =====================

async function asyncInitializationExample() {
  // --8<-- [start:async_initialization]
  class ConfigPlugin extends Plugin {
    private config: Record<string, unknown> = {}

    get name(): string {
      return 'config-plugin'
    }

    override initAgent(agent: AgentData): void {
      // Synchronous initialization
      this.config = { setting: 'value' }

      agent.addHook(BeforeToolCallEvent, () => {
        console.log(`Config: ${JSON.stringify(this.config)}`)
      })
    }
  }

  void ConfigPlugin
  // --8<-- [end:async_initialization]
}

// =====================
// Plugin with Tools using getTools
// =====================

async function pluginWithToolsExample() {
  // --8<-- [start:plugin_with_tools]
  class UtilityPlugin extends Plugin {
    get name(): string {
      return 'utility-plugin'
    }

    override getTools(): Tool[] {
      // Return tools that this plugin provides
      const timestampTool = new FunctionTool({
        name: 'get_timestamp',
        description: 'Get the current timestamp',
        inputSchema: { type: 'object', properties: {} },
        callback: async () => new Date().toISOString(),
      })

      return [timestampTool]
    }
  }

  void UtilityPlugin
  // const agent = new Agent({ plugins: [new UtilityPlugin()] })
  // --8<-- [end:plugin_with_tools]
}

// =====================
// Plugin for Hooks documentation reference
// =====================

async function pluginForHooksExample() {
  // --8<-- [start:plugin_for_hooks]
  class LoggingPlugin extends Plugin {
    get name(): string {
      return 'logging-plugin'
    }

    override initAgent(agent: AgentData): void {
      agent.addHook(BeforeToolCallEvent, (event) => {
        console.log(`Calling: ${event.toolUse.name}`)
      })

      agent.addHook(AfterToolCallEvent, (event) => {
        console.log(`Completed: ${event.toolUse.name}`)
      })
    }
  }

  void LoggingPlugin
  // const agent = new Agent({ plugins: [new LoggingPlugin()] })
  // --8<-- [end:plugin_for_hooks]
}

// Suppress unused function warnings
void usingPluginsExample
void basicPluginExample
void hookDecoratorAlternativeExample
void manualRegistrationExample
void stateManagementExample
void asyncInitializationExample
void pluginWithToolsExample
void pluginForHooksExample
