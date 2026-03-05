Repository session manager implementation.

## RepositorySessionManager

```python
class RepositorySessionManager(SessionManager)
```

Defined in: [src/strands/session/repository\_session\_manager.py:27](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L27)

Session manager for persisting agents in a SessionRepository.

#### \_\_init\_\_

```python
def __init__(session_id: str, session_repository: SessionRepository,
             **kwargs: Any)
```

Defined in: [src/strands/session/repository\_session\_manager.py:30](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L30)

Initialize the RepositorySessionManager.

If no session with the specified session\_id exists yet, it will be created in the session\_repository.

**Arguments**:

-   `session_id` - ID to use for the session. A new session with this id will be created if it does not exist in the repository yet
-   `session_repository` - Underlying session repository to use to store the sessions state.
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### append\_message

```python
def append_message(message: Message, agent: "Agent", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:62](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L62)

Append a message to the agent’s session.

**Arguments**:

-   `message` - Message to add to the agent in the session
-   `agent` - Agent to append the message to
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### redact\_latest\_message

```python
def redact_latest_message(redact_message: Message, agent: "Agent",
                          **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:81](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L81)

Redact the latest message appended to the session.

**Arguments**:

-   `redact_message` - New message to use that contains the redact content
-   `agent` - Agent to apply the message redaction to
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### sync\_agent

```python
def sync_agent(agent: "Agent", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:95](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L95)

Serialize and update the agent into the session repository.

**Arguments**:

-   `agent` - Agent to sync to the session.
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### initialize

```python
def initialize(agent: "Agent", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:107](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L107)

Initialize an agent with a session.

**Arguments**:

-   `agent` - Agent to initialize from the session
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### sync\_multi\_agent

```python
def sync_multi_agent(source: "MultiAgentBase", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:231](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L231)

Serialize and update the multi-agent state into the session repository.

**Arguments**:

-   `source` - Multi-agent source object to sync to the session.
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### initialize\_multi\_agent

```python
def initialize_multi_agent(source: "MultiAgentBase", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:240](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L240)

Initialize multi-agent state from the session repository.

**Arguments**:

-   `source` - Multi-agent source object to restore state into
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### initialize\_bidi\_agent

```python
def initialize_bidi_agent(agent: "BidiAgent", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:254](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L254)

Initialize a bidirectional agent with a session.

**Arguments**:

-   `agent` - BidiAgent to initialize from the session
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### append\_bidi\_message

```python
def append_bidi_message(message: Message, agent: "BidiAgent",
                        **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:307](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L307)

Append a message to the bidirectional agent’s session.

**Arguments**:

-   `message` - Message to add to the agent in the session
-   `agent` - BidiAgent to append the message to
-   `**kwargs` - Additional keyword arguments for future extensibility.

#### sync\_bidi\_agent

```python
def sync_bidi_agent(agent: "BidiAgent", **kwargs: Any) -> None
```

Defined in: [src/strands/session/repository\_session\_manager.py:326](https://github.com/strands-agents/sdk-python/blob/main/src/strands/session/repository_session_manager.py#L326)

Serialize and update the bidirectional agent into the session repository.

**Arguments**:

-   `agent` - BidiAgent to sync to the session.
-   `**kwargs` - Additional keyword arguments for future extensibility.