defmodule UiWeb.EvalChannel do
  use UiWeb, :channel

  def join("eval:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("run_code", %{"code" => code} = payload, socket) do
    output = try do
               inspect(Code.eval_string(~s(
              try do
                #{code}
              rescue
                any -> any
              end
              )))
    rescue
      any -> any
    end
    push socket, "eval_output", %{output: output}
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (eval:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
