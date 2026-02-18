import { z } from "zod";
import { SelectorOutbound } from "./groups/selector";
import { URLTestOutbound } from "./groups/urltest";
import { AnyTLSOutboundOptions } from "./protocols/anytls";
import { DirectOutboundOptions } from "./protocols/direct";
import { HTTPOutboundOptions } from "./protocols/http";
import { HysteriaOutboundOptions } from "./protocols/hysteria";
import { Hysteria2OutboundOptions } from "./protocols/hysteria2";
import { ShadowsocksOutboundOptions } from "./protocols/shadowsocks";
import { ShadowsocksROutboundOptions } from "./protocols/shadowsocksr";
import { ShadowTLSOutboundOptions } from "./protocols/shadowtls";
import { SocksOutboundOptions } from "./protocols/socks";
import { SSHOutboundOptions } from "./protocols/ssh";
import { TorOutboundOptions } from "./protocols/tor";
import { TrojanOutboundOptions } from "./protocols/trojan";
import { TUICOutboundOptions } from "./protocols/tuic";
import { VLESSOutboundOptions } from "./protocols/vless";
import { VMessOutboundOptions } from "./protocols/vmess";
import { LegacyWireGuardOutboundOptions } from "./protocols/wireguard";

export const Outbound = z
  .discriminatedUnion("type", [
    DirectOutboundOptions,
    SocksOutboundOptions,
    HTTPOutboundOptions,
    ShadowsocksOutboundOptions,
    VMessOutboundOptions,
    TrojanOutboundOptions,
    LegacyWireGuardOutboundOptions,
    HysteriaOutboundOptions,
    ShadowTLSOutboundOptions,
    AnyTLSOutboundOptions,
    Hysteria2OutboundOptions,
    TUICOutboundOptions,
    VLESSOutboundOptions,
    ShadowsocksROutboundOptions,
    SSHOutboundOptions,
    TorOutboundOptions,
    SelectorOutbound,
    URLTestOutbound,
    // Add other outbound types here
  ])
  .meta({
    id: "Outbound",
    title: "Outbound",
    title_zh: "出站",
    description:
      "Outbound configuration entries define available transport protocols for upstream connections, identified by `type` and optionally tagged for route matching.",
    description_zh:
      "出站配置项定义上游连接所使用的传输协议，`type` 表示协议类型，`tag` 可用于路由选择。",
  });

export type Outbound = z.infer<typeof Outbound>;
