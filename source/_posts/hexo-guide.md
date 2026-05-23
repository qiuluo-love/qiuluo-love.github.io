---
title: Hexo 博客搭建指南
date: 2025-10-27 10:00:00
tags:
  - Hexo
  - 教程
  - 博客
---

## 为什么选择 Hexo

[Hexo](https://hexo.io/) 是一个快速、简洁且高效的静态博客框架。它使用 Markdown 解析文章，通过主题支持快速生成静态页面，非常适合搭建个人博客。

## 环境准备

首先需要安装 Node.js 和 Git：

```bash
# 检查 Node.js 版本
node -v

# 检查 Git 版本
git --version
```

## 安装 Hexo

```bash
npm install -g hexo-cli
hexo init my-blog
cd my-blog
npm install
```

## 常用命令

```bash
# 新建文章
hexo new "My New Post"

# 本地预览
hexo server

# 生成静态文件
hexo generate

# 部署到 GitHub Pages
hexo deploy
```

## 选择主题

Hexo 有丰富的主题生态。我选择了 [Stun](https://theme-stun.github.io/) 主题，它简洁美观，功能丰富，支持：

- 响应式设计
- 暗黑模式
- 多种代码高亮风格
- 评论系统集成
- 搜索功能

## 部署到 GitHub Pages

1. 创建名为 `username.github.io` 的仓库
2. 安装部署插件：`npm install hexo-deployer-git --save`
3. 在 `_config.yml` 中配置部署信息
4. 运行 `hexo deploy`

## 结语

搭建一个个人博客并不复杂，最重要的是坚持写作。希望这篇指南对你有所帮助！
