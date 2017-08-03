intStart = 28
intEnd = 44
strParentFolder = "C:\Users\Isha\Documents\Ishadijcks.github.io\images\mine\"
strStem = ""

Set objFSO = CreateObject("Scripting.FileSystemObject")
If Right(strParentFolder, 1) <> "\" Then
	strParentFolder = strParentFolder & "\"
End If
If Not objFSO.FolderExists(strParentFolder) Then
	MsgBox "Can't find parent folder", vbOKOnly + vbCritical, Wscript.ScriptName
ElseIf intStart < 0 Or intEnd < intStart Or intEnd > 100 Then
	MsgBox "Number out of range", vbOKOnly + vbCritical, Wscript.ScriptName
Else
	For i = intStart to intEnd
		strNumber = i
		strNumber = Right("0" & strNumber, 2)
		strFolder = strParentFolder & strStem & strNumber
		If Not objFSO.FolderExists(strFolder) Then
			Set objFolder = objFSO.CreateFolder(strFolder)
		End If
	Next
End If