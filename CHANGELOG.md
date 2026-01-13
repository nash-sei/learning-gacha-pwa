# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-01-13

### Fixed
- コインの実が収穫後に再表示される問題を修正
  - `harvestedFruitIds` ステートを追加し、永続的に収穫済みの実を追跡
- クイズ画面で問題読み込み失敗時に白画面になる問題を修正
  - 安全性チェックを追加し、適切なエラーメッセージを表示
- クイズ画面にBackボタンを追加
  - プレイ中でもホームに戻れるように改善

### Changed
- コインの木のデザインを楕円形の葉のクラスターに変更
  - より自然で木らしい外観を実現
- 背景要素の復元（動く雲、小さな太陽）

## [0.1.0] - 2026-01-11

### Added
- 初回リリース
- クイズ機能（3段階の難易度）
- ガチャ機能（シール獲得）
- デンジャーモード（エクストラステージ）
- シールコレクション（図鑑）
- コインの木（学習成果の可視化）
- 親設定画面（報酬調整、データ管理）
- PWA対応（オフライン動作）
- カスタム問題インポート機能（CSV/テキスト）
