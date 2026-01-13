---
description: バージョンの更新とリリースノートの作成手順
---

# バージョン更新ワークフロー

このワークフローは、アプリに新機能追加やバグ修正を行った際のバージョン更新手順を説明します。

## バージョニングルール

このプロジェクトは [Semantic Versioning](https://semver.org/) に従います：

- **MAJOR** (例: 1.0.0 → 2.0.0): 後方互換性のない大きな変更
- **MINOR** (例: 0.1.0 → 0.2.0): 後方互換性のある機能追加
- **PATCH** (例: 0.1.0 → 0.1.1): 後方互換性のあるバグ修正

## 更新手順

### 1. 変更内容の確認

まず、何を変更したか確認します：
- バグ修正のみ → PATCH を上げる（例: 0.1.0 → 0.1.1）
- 新機能追加 → MINOR を上げる（例: 0.1.0 → 0.2.0）
- 破壊的変更 → MAJOR を上げる（例: 0.1.0 → 1.0.0）

### 2. CHANGELOG.md の更新

`CHANGELOG.md` を開き、新しいバージョンセクションを追加：

```markdown
## [新バージョン] - YYYY-MM-DD

### Added (新機能)
- 追加した機能の説明

### Changed (変更)
- 変更した内容の説明

### Fixed (バグ修正)
- 修正したバグの説明

### Removed (削除)
- 削除した機能の説明
```

### 3. package.json のバージョン更新

`package.json` の `version` フィールドを更新：

```bash
# 手動で編集するか、npm version コマンドを使用
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

### 4. アプリ内バージョン表示の確認

設定画面でバージョンが正しく表示されることを確認：
- 設定画面 → 下部に「App Version: X.X.X」が表示される
- 表示がpackage.jsonと一致していることを確認

### 5. Git コミット

変更をコミット：

```bash
git add CHANGELOG.md package.json
git commit -m "chore: bump version to X.X.X"
```

### 6. Git タグの作成（オプション）

リリースにタグを付ける：

```bash
git tag -a vX.X.X -m "Release version X.X.X"
git push origin vX.X.X
```

## 実例

### パッチリリース（バグ修正）の例

```bash
# 1. CHANGELOG.md を編集
# 2. バージョンを更新
npm version patch

# 3. コミット（npm version で自動的にコミットされます）

# 4. プッシュ
git push origin main
git push origin --tags
```

### マイナーリリース（新機能）の例

```bash
# 1. CHANGELOG.md を編集
# 2. バージョンを更新
npm version minor

# 3. コミット（npm version で自動的にコミットされます）

# 4. プッシュ
git push origin main
git push origin --tags
```

## 注意事項

- `npm version` コマンドは自動的に git commit と git tag を作成します
- CHANGELOG.md は必ず先に更新してからコミットしてください
- バージョン更新後は必ず動作確認を行ってください
- リリース前に `npm run build` でビルドエラーがないか確認してください

## チェックリスト

リリース前の確認項目：
- [ ] CHANGELOG.md を更新
- [ ] package.json のバージョンを更新
- [ ] `npm run build` が成功することを確認
- [ ] アプリを起動して動作確認
- [ ] 設定画面でバージョン表示を確認
- [ ] Git にコミット＆プッシュ
- [ ] （オプション）Git タグを作成
