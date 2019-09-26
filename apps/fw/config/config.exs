# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Customize non-Elixir parts of the firmware.  See
# https://hexdocs.pm/nerves/advanced-configuration.html for details.
config :nerves, :firmware, rootfs_overlay: "rootfs_overlay"

# Use shoehorn to start the main application. See the shoehorn
# docs for separating out critical OTP applications such as those
# involved with firmware updates.
config :shoehorn,
  app: Mix.Project.config()[:fw],
  init: [
    {IO, :puts, "Initializing..."},
    :nerves_runtime,
    :nerves_init_gadget
  ]

# For WiFi, set regulatory domain to avoid restrictive default
config :nerves_network,
  regulatory_domain: "US"

config :nerves_network, :default,
  wlan0: [
    ipv4_address_method: :dhcp,
    ssid: System.get_env("NERVES_NETWORK_SSID"),
    psk: System.get_env("NERVES_NETWORK_PSK"),
    key_mgmt: String.to_atom(System.get_env("NERVES_NETWORK_MGMT") || "WPA-PSK")
  ],
  usb0: [
    ipv4_address_method: :dhcp
  ]

# For Phoenix 
config :ui, UiWeb.Endpoint,
  http: [port: 80],
  secret_key_base: "wasabisexykurt",
  root: Path.dirname(__DIR__),
  server: true,
  render_errors: [view: UiWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Nerves.PubSub, adapter: Phoenix.PubSub.PG2]

# Allows over the air updates via SSH.
config :nerves_firmware_ssh,
  authorized_keys: [
    File.read!(Path.join(System.user_home!(), ".ssh/id_rsa.pub"))
  ]

config :logger, level: :debug

# Set a mdns domain and node_name to be able to remsh into the device.
config :nerves_init_gadget,
  node_name: :fw,
  mdns_domain: "rpi0.lan"

# Import target specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
# Uncomment to use target specific configurations

# import_config "#{Mix.target()}.exs"
