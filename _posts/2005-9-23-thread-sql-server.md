---
layout: post
title: sql server 线程
date: 2005-09-23 19:16:28
tags: sqlserver
categories: 手
---

```sql
create PROCEDURE sp_Sort_insert
(
  @sTable VARCHAR(255),
  @iSortParentID int OUTPUT,
  @sSortName NVARCHAR(255)
)
AS
BEGIN
  SET NOCOUNT ON
  DECLARE @iSortNum int
  DECLARE @s varchar(4000)

  SET @s='select @iSortNum=COUNT(0) FROM '+@sTable+' where SortID=@iSortParentID'
  EXEC (@s)

 --中间略
END
```

执行到exec报@iSortNum没有定义.询问得知exec启用了一个新线程,所以会说没有定义.

可是因为表是动态,又不能

```sql
select @iSortNum=COUNT(0) FROM '+@sTable+' where SortID=@iSortParentID
```
执行=_=

辛苦了一个下午的教训,白忙活了...

解决办法:

```sql
DECLARE @s NVARCHAR(4000)
SET @s=N'select @iSortNum=COUNT(0) FROM '+@sTable+' where SortID='+cast(@iSortParentID AS VARCHAR)
EXEC sp_executesql @s,N'@iSortNum int out',@iSortNum out
```

注意@s类型,varchar会错.
谢DLL:)
